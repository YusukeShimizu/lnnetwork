<template id="setting">
  <v-ons-page>
    <div v-show="settingScreenShow">
      <v-ons-list modifier="noborder">
        <v-ons-list-header>承認について</v-ons-list-header>
        <v-ons-list-item>
          <div class="left">
            <v-ons-icon icon="ion-fork-repo" class="list-item__icon"></v-ons-icon>
          </div>
          <div class="center">
            少額自動承認
          </div>
          <div class="right">
            <v-ons-switch></v-ons-switch>
          </div>
        </v-ons-list-item>
      </v-ons-list>
      <v-ons-list modifier="noborder">
        <v-ons-list-header>Kincoについて</v-ons-list-header>
        <v-ons-list-item modifier="chevron" tappable @click = "goKinkoPage">
          Kincoについて
        </v-ons-list-item>
        <v-ons-list-item modifier="chevron" tappable @click = "goSecurityPage">
          セキリティについて
        </v-ons-list-item>
        <v-ons-list-item modifier="chevron" tappable @click = "goQalistPage">
          よくある御質問
        </v-ons-list-item>
        <v-ons-list-item modifier="chevron" tappable @click = "goInquiryPage">
          問い合わせ
        </v-ons-list-item>
      </v-ons-list>
      <v-ons-button @click="logout" modifier="large--cta" class="halfwidth logout">
        Logout
      </v-ons-button>
    </div>
    <div v-show="securityScreenShow">
      <security-page></security-page>
    </div>
    <div v-show="kincoScreenShow">
      <kinco-page></kinco-page>
    </div>
    <div v-show="qalistScreenShow">
      <qalist-page></qalist-page>
    </div>
    <div v-show="inquiryScreenShow">
      <inquiry-page></inquiry-page>
    </div>
  </v-ons-page>
</template>

<script>
var eventBus = require('../../eventBus.js');
var securityPage = require('./settings/security.vue').default;
var kincoPage = require('./settings/kinco.vue').default;
var qalistPage = require('./settings/qalist.vue').default;
var inquiryPage = require('./settings/inquiry.vue').default;
module.exports = {
  template : "#setting",
  data() {
    return {
      settingScreenShow : true,
      securityScreenShow : false,
      kincoScreenShow : false,
      qalistScreenShow : false,
      inquiryScreenShow : false
    }
  },
  created() {
    eventBus.$on('back',this.getback);
  },
  methods : {
    logout(){
      eventBus.$emit("logout","logout");
    },
    goSecurityPage(){
      this.settingScreenShow = false;
      this.securityScreenShow = true;
    },
    goKinkoPage(){
      this.settingScreenShow = false;
      this.kincoScreenShow = true;
    },
    goQalistPage(){
      this.settingScreenShow = false;
      this.qalistScreenShow = true;
    },
    goInquiryPage(){
      this.settingScreenShow = false;
      this.inquiryScreenShow = true;
    },
    getback(){
      this.settingScreenShow = true;
      this.securityScreenShow = false;
      this.kincoScreenShow = false;
      this.qalistScreenShow = false;
      this.inquiryScreenShow = false;
    }
  },
  components : {
    securityPage,
    kincoPage,
    qalistPage,
    inquiryPage
  }
};

</script>

<style>
  .logout{
    margin: 10% auto;
  }
</style>
