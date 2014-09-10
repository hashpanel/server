/**
* Miner.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      notNull: true
    },
    model: {
      type: 'string'
    },
    hashRate: {
      // declared hashrate in GH/s
      type: 'integer'
    },
    powerUsage: {
      // declared power consumption in Watts
      type: 'integer'
    },
    purchasePrice: {
      type: 'float'
    },
    beginService: {
      type: 'date'
    },
    endService: {
      type: 'date'
    },
    connection: {
      model: 'MinerConnection'
    },
    site: {
      model: 'Site'
    },
    group: {
      model: 'Group'
    }
  }
};

