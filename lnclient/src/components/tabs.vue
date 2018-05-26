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
var participants = require('./tabs/participants.vue').default;
var assets = require('./tabs/assets.vue').default;
var transactions = require('./tabs/transactions.vue').default;

export default {
  template: '#main',
  data () {
    return {
      activeIndex: 0,
      tabs: [
        {
          icon: this.md() ? null : 'building',
          page: participants
        },
        {
          icon: this.md() ? null : 'book',
          page: assets
        },
        {
          icon: this.md() ? null : 'edit',
          page: transactions
        }
      ]
    };
  },
  components : {
    participants,
    assets,
    transactions
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
