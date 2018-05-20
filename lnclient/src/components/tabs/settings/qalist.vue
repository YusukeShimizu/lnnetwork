<template id="qalistPage">
  <v-ons-page>
    <v-ons-toolbar>
      <v-ons-icon icon="ion-android-arrow-back" @click="back" class="backicon" ></v-ons-icon>
      <div class="center">よくある御質問</div>
    </v-ons-toolbar>
  </v-ons-page>
</template>

<script>
var eventBus = require('../../../eventBus.js');

module.exports = {
  name: 'qalistPage',
  template: '#qalistPage',
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
</style>
