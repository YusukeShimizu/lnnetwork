<template id="reveive">
  <v-ons-page>
    <div class="middleAlign" v-show="receiveScreenShow">
      <v-ons-card class="card">
        <div class="currency">
          <v-ons-icon icon="ion-social-bitcoin" class="list-item__icon">
            Bitcoin
          </v-ons-icon>
        </div>
        <div  v-clipboard:copy="qrText" @click="$ons.notification.toast('Copied', { timeout: 1000, animation: 'fall' })">
          <qrcode :background="background" :size="size" :cls="qrCls" :value="qrText"></qrcode>
          <label class="ownaddress">
            {{qrText}}
          </label>
        </div>
        <div class="content margin-card-list">
          <v-ons-list>
            <v-ons-list-item modifier="chevron" @click = "goHistoryPage">
              <div class="left">
                残高
              </div>
              <div class="center">
                {{btcBalance}}
              </div>
            </v-ons-list-item>
          </v-ons-list>
        </div>
      </v-ons-card>
    </div>
    <div v-show="historyScreenShow">
      <history-page v-bind:receivelists="receivelists"></history-page>
    </div>
  </v-ons-page>
</template>

<script>
var eventBus = require('../../eventBus.js');
var bitcoinInfo = require('../../services/bitcoinInfo.js');
var Qrcode = require('v-qrcode/src/index').default;
var moment = require('moment');
var historyPage = require('./receive/history.vue').default;
var bitcoinObj;

export default {
  data () {
      return {
          qrCls: 'qrcode',
          size: 200,
          btcBalance : '',
          receivelists : [],
          toastVisible: false,
          background: '#1f1f2100',
          receiveScreenShow : true,
          historyScreenShow : false
      }
  },
  beforeCreate : function(){
    this.bitcoinObj = new bitcoinInfo();
    var keyInfo = JSON.parse(localStorage.getItem('keyInfo'));
    this.qrText = keyInfo.address;
  },
  created : function(){
    eventBus.$on('back',this.getback);
    //残高
    this.bitcoinObj.balance(this.qrText,function(res){
      this.btcBalance = res.balance / 100000000;
    }.bind(this));
    //受信履歴
    this.bitcoinObj.receivehistory(this.qrText,function(res){
      for(var i = 0; i<res.length; i++){
        res[i].value = res[i].value / 100000000;
        res[i].received = moment(res[i].received).format("YYYY/MM/DD HH:mm:ss");
      }
      this.receivelists = res;
    }.bind(this));
  },
  methods : {
    goHistoryPage(){
      this.receiveScreenShow = false;
      this.historyScreenShow = true;
    },
    getback(){
      this.receiveScreenShow = true;
      this.historyScreenShow = false;
    }
  },
  components: {
      Qrcode,
      historyPage
  }
};
</script>

<style scoped>
  .middleAlign {
    padding-top: 5%;
    margin-top: 40px;
    text-align:center;
  }
  .card{
    text-align:center;
  }
  .ownaddress{
    color:#0035f7d4;
    text-decoration: underline;
  }
  .currency{
    font-size: 30px;
    padding-bottom:10px;
  }
  .margin-card-list{
    margin: 10%;
  }
</style>