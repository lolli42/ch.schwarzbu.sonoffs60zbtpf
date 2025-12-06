'use strict';

const { ZigBeeDevice } = require('homey-zigbeedriver');
const {debug, CLUSTER} = require("zigbee-clusters");

debug(true);

class SonoffS60ZBTPF extends ZigBeeDevice {
  async onNodeInit({ zclNode }) {
    this.log('init');
    if (this.hasCapability('onoff')) {
      this.registerCapability(
        'onoff',
        CLUSTER.ON_OFF,
        {
          // Handle the device on/off switch to report state back to homey when toggled:
          // a) lame solution with getOpts: actively poll all x milliseconds
          //getOpts: { pollInterval: 15000, getOnOnline: true },
          // b) register reporting attribute so device actively sends changed on/off state to homey
          //report: 'onOff', // unsure what this is good for.
          //reportParser(report) { // debugging reported value
          //  this.log(report);
          //  return report === true;
          //},
          reportOpts: {
            configureAttributeReporting: {
              minInterval: 1, // Device does not send data when on/off switch is
                              // toggled for often than once a second. This is the
                              // min value from interview.
              maxInterval: 600, // Not 100% sure how this works.
            },
          },
        }
      );

    }
  }
}

module.exports = SonoffS60ZBTPF;
