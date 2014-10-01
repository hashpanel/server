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
    summary: {
      type: 'json'
    },
    miner: {
      model: 'Miner'
    }
  }
};

