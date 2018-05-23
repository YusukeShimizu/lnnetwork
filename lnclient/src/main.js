/*
 * Main entry point for this app
 */

var Vue = require('vue');
var VueOnsen =require('vue-onsenui');
var tabs = require('./components/tabs.vue').default;
var eventBus = require('./eventBus.js');

Vue.use(VueOnsen);

var vue = new Vue({
  el : '#main',
  data: {
  },
  created() {
  },
  methods : {
  },
  components : {
    'main-tabs' : tabs,
  },
  alias: {
    'vue$': 'vue/dist/vue.runtime.common.js'
  }
});


