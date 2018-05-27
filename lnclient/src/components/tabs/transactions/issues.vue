<template id="issuePage">
  <v-ons-page>
    <v-ons-toolbar>
      <v-ons-icon icon="ion-android-arrow-back" @click="back" class="backicon" ></v-ons-icon>
      <div class="center">Issue</div>
    </v-ons-toolbar>
  </v-ons-page>
</template>

<script>
var eventBus = require('../../../eventBus.js');
module.exports = {
  name: 'issuePage',
  template: '#issuePage',
  methods : {
    back(){
      eventBus.$emit("back","");
    }
  }
};
</script>

<style>
</style>
