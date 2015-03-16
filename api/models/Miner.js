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
    proxy: {
      model: 'MinerProxy'
    },
    notes: {
      type: 'text'
    },
    hashRate: {
      // declared hashrate in MH/s
      type: 'float'
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
    workers: {
      collection: 'PoolWorker',
      via: 'miner'
    }
  },

  /**
   * Enforce host+port uniqueness. This ensures that user A cannot claim they
   * also own a miner that currently belongs to user B.
   */
  beforeCreate: function (miner, next) {
    Miner.find({
        host: miner.host,
        port: miner.port
      })
      .then(function (miners) {
        if (miners.length === 0) return next();

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
        createdBy: miner.createdBy
      })
      .then(function (group) {
        miner.group = group.id;
        next();
      })
      .catch(next);
  },

  afterCreate: function (miner, next) {
    if (miner.interval > 0) {
      MinerService.createUpdateInterval(miner);
    }

    next();
  }
};
