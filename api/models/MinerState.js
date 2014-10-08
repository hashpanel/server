/**
 * MinerState
 *
 * A snapshot of miner state at a particular point in time
 */
module.exports = {
  autoUpdatedAt: false,

  attributes: {
    success: {
      type: 'boolean'
    },
    error: {
      type: 'json'
    },
    version: {
      type: 'json'
    },
    summary: {
      type: 'json'
    },
    pools: {
      type: 'json'
    },
    event: {
      type: 'string'
    },
    miner: {
      model: 'Miner',
      index: true
    }
  },

  /**
   * Update the current 'state' property of the associated Miner
   */
  afterCreate: function (state, next) {
    Miner.findOne(state.miner)
      .then(function (miner) {
        miner.state = state;
        return miner.save();
      })
      .then(function (miner) {
        next();
      })
      .catch(next);
  }
};
