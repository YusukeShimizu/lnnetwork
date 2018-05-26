
function lnConnection(){
  if (!(this instanceof lnConnection)){
    return new lnConnection();
  }

  this.URL = 'http://883ace79.ngrok.io/api/org.acme.lcnetwork';
  this.dhttp = require('dhttp/200');

}

lnConnection.prototype.get = function(name,id,callback){

  var self = this;

  if(typeof id == "function") { 
    callback = id;
    id = "";
  }

  this.dhttp({
    method: "GET",
    url: self.URL + '.' + name +'/' + id
  }, function (err, res) {
    if (err) return
    callback(res);
  });

}

module.exports = lnConnection;

