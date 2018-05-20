<template>
  <v-ons-page>
    <v-ons-toolbar>
      <v-ons-icon icon="ion-android-arrow-back" @click="back" class="backicon" ></v-ons-icon>
      <div class="center">QR Reader</div>
    </v-ons-toolbar>
    <qrcode-reader @decode="onDecode" @locate="onLocate"></qrcode-reader>
  </v-ons-page>
</template>

<script>
import {QrcodeReader} from 'vue-qrcode-reader/dist/vue-qrcode-reader.common';
var eventBus = require('../../eventBus.js');
export default {
  key: 'qrReader',
  template: '#qrReader',
  name: 'qrReader',
  components : {
    QrcodeReader
  },
  methods: {
    onDecode (content) {
      if(content.length > 0){
        eventBus.$emit("address",content);
        this.$el.remove();
        this.$destroy();        
      }
    },
    onLocate (points) {
    },
    back(){
      eventBus.$emit("address","");
      this.$el.remove();
      this.$destroy();   
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