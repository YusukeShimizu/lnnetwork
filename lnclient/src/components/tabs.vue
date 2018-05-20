<template id = "main">
  <v-ons-page >
    <v-ons-tabbar  position="auto"
      :tabs="tabs"
      :visible="true"
      :index.sync="activeIndex">
    </v-ons-tabbar>
  </v-ons-page>
</template>


<script>
var Send = require('./tabs/send.vue').default;
var Receive = require('./tabs/receive.vue').default;
var Setting = require('./tabs/setting.vue').default;

export default {
  template: '#main',
  data () {
    return {
      activeIndex: 0,
      tabs: [
        {
          icon: this.md() ? null : 'ion-share',
          page: Send,
          label: 'Send'
        },
        {
          icon: this.md() ? null : 'ion-archive',
          page: Receive,
          label: 'Receive'
        },
        {
          icon: this.md() ? null : 'ion-gear-b',
          page: Setting,
          label: 'Setting'
        }
      ]
    };
  },
  components : {
    Send
    ,Receive
    ,Setting
  },
  methods: {
    md() {
      return this.$ons.platform.isAndroid();
    }
  },
  computed: {
    title() {
      return this.tabs[this.activeIndex].label;
    }
  }
};
</script>
<style>
  .personalbutton{
    bottom: 80px;
  }
  *{
    font-family: monospace;
  }
  *:not(input):not(textarea):not(select) {
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
      user-select: text;
  }
</style>