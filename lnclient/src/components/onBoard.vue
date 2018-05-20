<template> 
  <div id="onBoard">
    <h2>Kinco</h2>
    <button v-on:click="generateKeyPair">generateKeyPair</button>
    <p>Copyright (c) 2018, Candy.</p>
  </div>
</template>

<script>

var bjs = require('bitcoinjs-lib');
var eventBus = require('../eventBus.js');

module.exports = {
  name: 'onBoard',
  methods: {
    generateKeyPair : function(){
      var keyPair = bjs.ECPair.makeRandom({network: bjs.networks.testnet});
      eventBus.$emit('login', keyPair);
    }
  }
}
</script>

