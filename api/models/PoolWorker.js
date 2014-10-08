/**
* PoolWorker.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    miner: {
      model: 'Miner',
      unique: true
    },
    name: {
      type: 'string',
      notNull: true
    },
    password: {
      type: 'string',
    },
    pool: {
      model: 'Pool'
    }
  },

  afterUpdate: function (worker, next) {
    PoolWorker.find(worker.miner)
      .populate('miner')
      .populate('pool')
      .then(function (worker) {
        return MinerService.updateWorker(worker);
      })
      .then(function (result) {
        next();
      })
      .catch(next);
  }
};

