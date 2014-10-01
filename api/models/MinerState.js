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
  }
};

