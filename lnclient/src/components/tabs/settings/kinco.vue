<template id="kincoPage">
  <v-ons-page>
    <v-ons-toolbar>
      <v-ons-icon icon="ion-android-arrow-back" @click="back" class="backicon" ></v-ons-icon>
      <div class="center">Kinco</div>
    </v-ons-toolbar>
    <div>セイヤ</div>
  </v-ons-page>
</template>

<script>
var eventBus = require('../../../eventBus.js');

module.exports = {
  name: 'kincoPage',
  template: '#kincoPage',
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
