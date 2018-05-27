<template id="transactions">
  <v-ons-page>
    <div v-show="transactionsShow">
      <v-ons-list modifier="noborder">
        <v-ons-list-header>transactions</v-ons-list-header>
        <v-ons-list-item modifier="chevron" tappable @click = "goIssuePage">
          issue
        </v-ons-list-item>
        <v-ons-list-item>
          <a href="http://17b92687.ngrok.io/explorer/" target="_blank">Hyperledger Composer REST server</a>
        </v-ons-list-item>

      </v-ons-list>
    </div>
    <div v-show="issueScreenShow">
      <issue-page></issue-page>
    </div>
  </v-ons-page>
</template>

<script>
var eventBus = require('../../eventBus.js');
var issuePage = require('./transactions/issues.vue').default;

module.exports = {
  template : "#transactions",
  data() {
    return {
      transactionsShow : true,
      issueScreenShow : false
    }
  },
  created() {
    eventBus.$on('back',this.getback);
  },
  methods : {
    goIssuePage(){
      this.transactionsShow = false;
      this.issueScreenShow = true;
    },
    getback(){
      this.transactionsShow = true;
      this.issueScreenShow = false;
    }
  },
  components : {
    issuePage
  }
};
</script>

<style>

</style>
