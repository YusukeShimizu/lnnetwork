<template id="inquiryPage">
  <v-ons-page>
    <v-ons-toolbar>
      <v-ons-icon icon="ion-android-arrow-back" @click="back" class="backicon" ></v-ons-icon>
      <div class="center">Inquiry</div>
    </v-ons-toolbar>
  </v-ons-page>
</template>

<script>
var eventBus = require('../../../eventBus.js');

module.exports = {
  name: 'inquiryPage',
  template: '#inquiryPage',
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
