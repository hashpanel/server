/**
* Miner.js
*
* A physical bitcoin miner that produces hashes.
*/
module.exports = {
  attributes: {
    name: {
      type: 'string',
      notNull: true
    },
    device: {
      model: 'MinerDevice'
    },
    notes: {
      type: 'text'
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
    monthlyFee: {
      type: 'float'
    },
    beginService: {
      type: 'date'
    },
    endService: {
      type: 'date'
    },
    host: {
      type: 'string'
    },
    port: {
      type: 'integer',
      defaultsTo: 4028
    },
    site: {
      model: 'Site',
      index: true
    },
    group: {
      model: 'Group',
      index: true
    },
    owner: {
      model: 'User',
      index: true
    },
    state: {
      model: 'MinerState'
    },
    history: {
      collection: 'MinerState',
      via: 'miner'
    },
    interval: {
      type: 'integer',
      defaultsTo: 300
    },
    worker: {
      model: 'PoolWorker'
    }
  },

  afterCreate: function (miner, next) {
    MinerService.createUpdateInterval(miner);

    next();
  }
};

