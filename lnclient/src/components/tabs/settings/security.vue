<template id="securityPage">
  <v-ons-page>
    <v-ons-toolbar>
      <v-ons-icon icon="ion-android-arrow-back" @click="back" class="backicon" ></v-ons-icon>
      <div class="center">Security</div>
    </v-ons-toolbar>
  </v-ons-page>
</template>

<script>
var eventBus = require('../../../eventBus.js');

module.exports = {
  name: 'securityPage',
  template: '#securityPage',
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
