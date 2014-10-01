var Client = require('cgminer-api').client;

/**
 * Contact a physical miner and store its state in a MinerState object
 */
function update (miner) {
  var cgminer = new Client(miner.connection);
  
  return cgminer.connect()
    .then(function (client) {
      return {
        version: client.version(),
        summary: client.summary(),
        pools: client.pools()
      };
    })
    .then(function (state) {
      return MinerState.create(_.merge({
        miner: miner.id,
        error: null,
        success: true
      }, state));
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
