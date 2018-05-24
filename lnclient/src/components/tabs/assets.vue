<template id="assets">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">assets</div>
    </v-ons-toolbar>

    <div>
      <ul class="list list--material">
        <li class="list-header list-header--material">
          LC
        </li>
        <li class="list-item list-item--material" v-for="(LC, index) in LClists">
          <div class="list-item__center list-item--material__center nocomplete">
            <v-ons-row>
              <v-ons-col width="150px">{{ receivelist.value }} BTC　(完了)</v-ons-col>
              <v-ons-col>時間：{{ receivelist.received }}</v-ons-col>
            </v-ons-row>
          </div>
        </li>
      </ul>
    </div>
  </v-ons-page>
</template>

<script>
var eventBus = require('../../eventBus.js');
var lnConnectionInfo = require('../../services/lnConnectionInfo.js');
var lnConnection;
export default {
  data () {
    return {
      lists : [],
      background: '#1f1f2100'
    }
  },
  beforeCreate : function(){
    this.lnConnection = new lnConnectionInfo();
  },
  created : function(){
    var self = this;
    this.lnConnection.get("Asset", function(res){
      self.LClists = res;
    });
  },
  methods : {
  },
  components: {
  }
};
</script>

<style scoped>
</style>
