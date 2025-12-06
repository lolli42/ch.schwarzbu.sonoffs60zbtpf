'use strict';

const { ZigBeeDevice } = require('homey-zigbeedriver');
const {debug, CLUSTER} = require("zigbee-clusters");

debug(true);

class SonoffS60ZBTPF extends ZigBeeDevice {
  async onNodeInit({ zclNode }) {
    if (this.hasCapability('onoff')) {
      this.registerCapability(
        'onoff',
        CLUSTER.ON_OFF,
        { getOpts: { pollInterval: 15000, getOnOnline: true } }
      );
    }
  }
}

module.exports = SonoffS60ZBTPF;
