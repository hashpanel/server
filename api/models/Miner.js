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
    internalAddress: {
      type: 'string'
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
      collection: 'PoolWorker',
      via: 'miner'
    }
  },

  /**
   * Ensure host+port uniqueness per-user
   */
  beforeCreate: function (miner, next) {
    Miner.find({
        host: miner.host,
        port: miner.port
      })
      .then(function (miners) {
        if (miners.length === 0) next();

        next(new Error('Miner.Validation.HostPortUniqueness'));
      })
      .catch(next);
  },

  /**
   * If no Group is set, use the default group for the owner
   */
  afterValidate: function (miner, next) {
    if (miner.group) return next();

    Group.find({
        name: 'default',
        owner: miner.owner
      })
      .then(function (group) {
        miner.group = group.id;
        next();
      })
      .catch(next);
  },

  afterCreate: function (miner, next) {
    MinerService.createUpdateInterval(miner);

    next();
  }
};
