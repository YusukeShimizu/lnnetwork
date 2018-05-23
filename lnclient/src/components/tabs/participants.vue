<template id="participants">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">participants</div>
    </v-ons-toolbar>

    <div>
      <ul class="list list--material">
        <li class="list-item list-item--material" v-for="(lists, index) in lists.Banks">
          <div class="list-item__center list-item--material__center nocomplete">
            <v-ons-row>
            </v-ons-row>
          </div>
        </li>
        <li class="list-item list-item--material" v-for="(lists, index) in lists.Companies">
          <div class="list-item__center list-item--material__center nocomplete">
            <v-ons-row>
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
      lists : {
        Banks : [],
        Companies : []
      },
      background: '#1f1f2100'
    }
  },
  beforeCreate : function(){
    this.lnConnection = new lnConnectionInfo();
  },
  created : function(){
    var self = this;
    this.lnConnection.get("Bank", function(res){
      self.lists.Banks = res;
    });
    this.lnConnection.get("Company", function(res){
      self.lists.Companies = res;
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
