<template id="historyPage">
  <v-ons-page>
    <v-ons-toolbar>
      <v-ons-icon icon="ion-android-arrow-back" @click="back" class="backicon" ></v-ons-icon>
      <div class="center">受信履歴</div>
    </v-ons-toolbar>
    <div>
      <ul class="list list--material">
        <li class="list-item list-item--material" v-for="(receivelist, index) in receivelists">
          <div class="list-item__center list-item--material__center nocomplete" v-if="receivelist.confirmations > 0">
            <v-ons-row>
              <v-ons-col width="150px">{{ receivelist.value }} BTC　(完了)</v-ons-col>
              <v-ons-col>時間：{{ receivelist.received }}</v-ons-col>
            </v-ons-row>
            <div class="sub">取引ID</div>
            <div class="transactionid">{{ receivelist.hash }}</div>
          </div>
          <div class="list-item__center list-item--material__center nocomplete" v-else>
            <v-ons-row>
              <v-ons-col width="150px">{{ receivelist.value }} BTC (未完了)</v-ons-col>
              <v-ons-col>{{ receivelist.received }}</v-ons-col>
            </v-ons-row>
            <div class="sub">取引ID</div>
            <div class="transactionid">{{ receivelist.hash }}</div>
          </div>
        </li>
      </ul>
    </div>
  </v-ons-page>
</template>

<script>
var eventBus = require('../../../eventBus.js');

module.exports = {
  name: 'historyPage',
  template: '#historyPage',
  props: ['receivelists'],
  methods : {
    back(){
      eventBus.$emit("back","");
    }
  }
};

</script>

<style>
.backicon{
  position: absolute;
  padding-left: 10px;
  font-size: 25px;
  padding-top: 10px;
}
.transactionid{
  word-break: break-word;
  font-size: 9px;
  color: blue;
  padding: 2px;
}
.sub{
  color: black;
  text-decoration: underline;
  padding-top: 4px;
  padding-left: 2px;
  width: 100%;
}
li:has(.nocomplete){
  background: beige !important;
}
</style>
