/**
 * MinerState
 *
 * A snapshot of miner state at a particular point in time
 */
module.exports = {
  attributes: {
    success: {
      type: 'boolean'
    },
    error: {
      type: 'json'
    },
    version: {
      type: 'string'
    },
    summary: {
      type: 'json'
    },
    pools: {
      type: 'json'
    },
    miner: {
      model: 'Miner'
    }
  },

  /**
   * Update the current 'state' property of the associated Miner
   */
  afterCreate: function (state, next) {
    Miner.find(state.miner)
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

