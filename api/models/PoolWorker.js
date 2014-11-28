/**
* PoolWorker.js
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
    miner: {
      model: 'Miner'
    },
    password: {
      type: 'string',
      defaultsTo: 'x'
    },
    pool: {
      model: 'Pool'
    },
    currency: {
      model: 'Currency'
    },
    quota: {
      type: 'integer',
      defaultsTo: 1,
      max: 100,
      min: 0
    },
    cgminerId: {
      // TODO keep this field out of response
      type: 'integer',
      defaultsTo: 0
    }
  },

  afterCreate: function (worker, next) {
    PoolWorker.findOne(worker.id)
      .populate('miner')
      .populate('pool')
      .then(function (worker) {
        return MinerService.createWorker(worker);
      })
      .then(function (result) {
        next();
      })
      .catch(next);

  },

  afterUpdate: function (worker, next) {
    PoolWorker.findOne(worker.id)
      .populate('miner')
      .populate('pool')
      .then(function (worker) {
        return MinerService.updateWorker(worker);
      })
      .then(function (result) {
        next();
      })
      .catch(next);
  },

  /**
   * Ensure that the sum of all PoolWorker quotas for this miner equals 100
   */
  /*
  afterValidate: function (worker, next) {
    PoolWorker.find({ miner: worker.miner })
      .then(function (workers) {
        var quota = _.reduce(_.pluck(workers, 'quota'), function (sum, quota) {
          return sum + quota;
        }, worker.quota);

        if (quota > 100) {
          worker.quota = 0;
          return next(new Error(__('PoolWorker.InvalidQuota')));
        }

        next();
      })
      .catch(next);
  },
  */

  beforeDestroy: function (worker, next) {
    // XXX docs suggest "worker" here might be an array. need to test this
    //sails.log(worker);
    PoolWorker.findOne(worker.id)
      .populate('miner')
      .then(function (worker) {
        MinerService.removeWorker(worker);
        next();
      })
      .catch(next);
  }
};
