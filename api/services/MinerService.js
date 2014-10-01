var Client = require('cgminer-api').client;

/**
 * Contact a physical miner and store its state in a MinerState object
 */
function update (miner) {
  var cgminer = new Client(miner.connection);
  
  return cgminer.connect()
    .then(function (client) {
      return client.summary();
    })
    .then(function (summary) {
      return MinerState.create({
        miner: miner.id,
        error: null,
        success: true,
        summary: summary
      });
    })
    .catch(function (error) {
      return MinerState.create({
        miner: miner.id,
        error: error,
        success: false
      });
    });
}

/**
 * Update all miners for a user
 */
function updateAll (user) {
  return Miner
    .find({ owner: user.id })
    .populate('connection')
    .then(function (miners) {
      return _.map(miners, update);
    });
}
