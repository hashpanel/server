/**
* MinerDevice.js
*
* The make/model of the device, e.g. Antminer S3. These typically will be loaded as
* fixtures since there is little practical need for users to define custom
* devices.
*/

module.exports = {
  attributes: {
    manufacturer: {
      type: 'string'
    },
    name: {
      type: 'string'
    },
    website: {
      type: 'string',
      url: true
    },
    miners: {
      collection: 'Miner',
      via: 'device'
    }
  }
};

