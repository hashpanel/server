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
    device: {
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
    },
    owner: {
      model: 'User'
    },
    history: {
      collection: 'MinerState',
      via: 'miner'
    },
    pollInterval: {
      type: 'integer',
      defaultsTo: 60
    }
  }
};

