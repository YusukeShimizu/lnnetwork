<template id="issuePage">
  <v-ons-page>
    <v-ons-toolbar>
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
.backicon{
  position: absolute;
  padding-left: 10px;
  font-size: 25px;
  padding-top: 10px;
}
</style>
