<template id="send">
  <v-ons-page modifier="material">
    <div id="sendInfo" class = "middleAlign" v-show="sendScreenShow">
      <v-ons-card class="card">
        <form @submit.prevent="sendBtc">
          <div class="currency">
            <v-ons-icon icon="ion-social-bitcoin" class="list-item__icon">
              Bitcoin
            </v-ons-icon>
          </div>
          <v-ons-icon icon="fa-qrcode" class="list-item__icon qricon" @click="qrreader"></v-ons-icon>
          <v-ons-row vertical-align="center">
            <v-ons-col>
              <v-ons-input required class="sendInput" id="address" placeholder="送信先アドレス" float modifier="material" type="text" v-model="sendAddress"></v-ons-input>
            </v-ons-col>
          </v-ons-row>
          <v-ons-row vertical-align="center" class="sendrow">
            <v-ons-col>
              <div class="center">
                <v-ons-input required pattern="^([1-9]\d*|0)(\.\d+)?$" class="sendInput" placeholder="送金額" float modifier="material" v-model="amount"></v-ons-input>
              </div>
            </v-ons-col>
          </v-ons-row>
          <v-ons-row vertical-align="center" class="sendrow">
            <v-ons-col class="center">
              <button class="button--large--cta halfwidth" type= "submit">Send</button>
            </v-ons-col>
          </v-ons-row>
        </form>
        <div class="content margin-card-list">
          <v-ons-list>
            <v-ons-list-item modifier="chevron">
              <div class="left">
                送金履歴
              </div>
            </v-ons-list-item>
          </v-ons-list>
        </div>
      </v-ons-card>
    </div>
    <div id="qrReaderEl" v-show = "sendScreenShow === false">
    </div>
    <v-ons-toast :visible.sync="successVisible" animation="fall">
      送金完了
      <button @click="successVisible = false">OK</button>
    </v-ons-toast>
    <v-ons-dialog cancelable :visible.sync="failVisible">
      <div v-for="(failreason, index) in failreasons">
        <p>{{failreason.error}}</p>
      </div>
    </v-ons-dialog>
  </v-ons-page>
</template>

<script>
var qrReader = require('../common/qrreader.vue').default;
var eventBus = require('../../eventBus.js');
var bitcoinInfo = require('../../services/bitcoinInfo.js');
var Vue = require('vue');
var ComponentClass = Vue.extend(qrReader);
var bitcoinObj;

export default {
  key: 'send',
  template: '#send',
  data() {
    return {
      amount : "",
      sendAddress : "",
      fromAddress : "",
      failreasons : [{error:""}],
      successVisible: false,
      failVisible: false,
      sendScreenShow : true
    };
  },
  created() {
    this.bitcoinObj = new bitcoinInfo();
    eventBus.$on('address',this.getAddress);
    var keyInfo = JSON.parse(localStorage.getItem('keyInfo'));
    this.fromAddress = keyInfo.address;
  },
  methods: {
    qrreader() {
      this.sendScreenShow = false;
      var instance = new ComponentClass().$mount();
      document.getElementById('qrReaderEl').appendChild(instance.$el);
    },
    getAddress(address){
      this.sendScreenShow = true;
      this.sendAddress = address;
    },
    sendBtc(){
      this.bitcoinObj.sendBtc(
        this.sendAddress,
        this.fromAddress,
        this.amount,
        function(error,res){
          if (!error){
            this.sendAddress = "";
            this.amount = "";
            this.successVisible = true;
          }else{
            this.failreasons = error;
            this.failVisible = true;
          }
        }.bind(this)
      );
    }
  }
};
</script>

<style>
  #address input {
    font-size: 13px !important;
  }
  .middleAlign {
    padding-top: 15%;
    text-align:center;
  }
  .maxwidth {
    width : 100%;
  }
  .halfwidth{
    width : 200px;
  }
  .sendrow{
    padding-top: 40px;
  }
  .center{    
    text-align: -webkit-center;
  }
  .sendInput{
    width : 70%;
  }
  .qricon{
    position: relative;
    font-size: 42px;
    top: 10%;
    padding-top:10px;
    z-index:1000;
  }
  .card{
    text-align:center;
  }
  .margin-card-list{
    margin: 10%;
  }
</style>