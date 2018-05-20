/*
 * Main entry point for this app
 */

var Vue = require('vue');
var VueOnsen =require('vue-onsenui');
var tabs = require('./components/tabs.vue').default;
var onboard = require('./components/onBoard.vue').default;
var eventBus = require('./eventBus.js');
var VueClipboard = require('vue-clipboard2');

Vue.use(VueOnsen);
Vue.use(VueClipboard);

var vue = new Vue({
  el : '#main',
  data: {
    keyExist: localStorage.keyPair ? true : false
  },
  created() {
    eventBus.$on('login',this.login);
    eventBus.$on('logout', this.logout);
  },
  methods : {
    login(keyPair){
      localStorage.setItem('keyPair',keyPair);
      var storeInfo = {
        address : keyPair.getAddress(),
        wif : keyPair.toWIF(),
        network : keyPair.network
      }
      localStorage.setItem('keyInfo',JSON.stringify(storeInfo));
      this.keyExist = true;
    },
    logout(){
      localStorage.removeItem('keyPair'); 
      this.keyExist = false;
    }
  },
  components : {
    'main-tabs' : tabs,
    'main-onboard' : onboard
  },
  alias: {
    'vue$': 'vue/dist/vue.runtime.common.js'
  }
});


