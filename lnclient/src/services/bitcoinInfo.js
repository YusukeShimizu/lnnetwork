var _ = require('underscore');
var bjs = require('bitcoinjs-lib');
var eventBus = require('../eventBus.js');
var dhttp = require('dhttp/200');
var bigi    = require("bigi");
var buffer  = require('buffer');
var request = require('request');

var APIURL = 'https://api.blockcypher.com/v1/btc/test3';
var TOKEN = "c4610399bdba435b8f210346820df2a4";

function bitcoinInfo(){
    _.bindAll(this,
        'balance',
        'receivehistory',
        'sendBtc'
    );
};
/* 参照系 */
    /* common */
    bitcoinInfo.prototype.balance = function(address, cb){
        dhttp({
            method: 'GET',
            url: APIURL + '/addrs/'+address+'/balance?token=' + TOKEN
        }, function (err, res) {
            if (err) return
            cb(res);
        });
    }    
    bitcoinInfo.prototype.receivehistory = function(address, cb){
        var receivelists = [];
        dhttp({
            method: 'GET',
            url: APIURL + '/addrs/'+address+'/full?limit=50&token=' + TOKEN
        }, function (err, res) {
            if (err) return
            var ownchange = true;
            _.every(res.txs, function(eachtransaction){
              console.log(eachtransaction);
              _.every(eachtransaction.inputs, function(owninputs){
                if(_.contains(owninputs.addresses, address)){
                  ownchange = false; 
                  return false;
                }
                return true;
              })
              _.every(eachtransaction.outputs, function(ownoutputs){
                  if(_.contains(ownoutputs.addresses, address)){
                      if(ownchange){
                        receivelists.push(_.extend(ownoutputs,eachtransaction));
                      }
                  }
                  return true;
              })
              ownchange = true;
              return true;
            });
            cb(receivelists);
        });
    }

    bitcoinInfo.prototype.sendBtc = function(toAddress,fromAddress,amountval, cb){
        var newtx = {
            inputs: [{addresses: [fromAddress.toString()]}],
            outputs: [{addresses: [toAddress.toString()], value: Number(amountval*100000000)}]
        };

        request.post({
            url: APIURL + '/txs/new?token=' + TOKEN,
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(newtx)
          }, function (error, response, body){
            console.log('txs/new');
            console.log(body);
            if (error){
                cb(JSON.parse(err),null);
            }else if(JSON.parse(body).errors){
                console.log(JSON.parse(body).errors);
                cb(JSON.parse(body).errors,null);
            }else{
              var jsonbody = JSON.parse(body);
              var tmptx = jsonbody;
              var keyInfo = JSON.parse(localStorage.getItem('keyInfo'));
              var keys =  new bjs.ECPair.fromWIF(keyInfo.wif,keyInfo.network);
              tmptx.pubkeys = [];
              tmptx.signatures = tmptx.tosign.map(function(tosign, n) {
                  tmptx.pubkeys.push(keys.getPublicKeyBuffer().toString("hex"));
                  return keys.sign(new buffer.Buffer(tosign, "hex")).toDER().toString("hex");
              });
              request.post({
                  url: APIURL + '/txs/send?token=' + TOKEN,
                  headers: {
                    "content-type": "application/json"
                  },
                  body: JSON.stringify(tmptx)
                }, function (error, response, body){
                  if (error){
                    cb(JSON.parse(error),null);
                  }else if(JSON.parse(body).errors){
                    console.log(JSON.parse(body).errors);
                    cb(JSON.parse(body).errors,null);
                  }else{
                    console.log('txs/send');
                    console.log(body);
                    cb(null,JSON.parse(body));
                  }
                  
                }
              );
            }   
          }
        );
    }

module.exports = bitcoinInfo;
