var moment = require('moment');
var Client = require('cgminer-api').client;

/**
 * Instruct a miner to mine for a particular pool.
 * @public
 */
function updateWorker (worker) {
  var cgminer = new Client({
    host: worker.miner.host,
    port: worker.miner.port
  });

  return cgminer.connect()
    .then(function (client) {
      // set pool
    })
    .then(function (pool) {
      return MinerState.create({
        miner: miner.id,
        event: 'worker change',
        error: null,
        success: true
      });
    });

}

/**
 * Contact a physical miner and store its state in a MinerState object
 * @public
 */
function update (miner) {
  if (_.isEmpty(miner.host)) {
    sails.log('not updating miner', miner.name, 'for user', miner.owner, '; no miner.host set');
    return;
  }

  var cgminer = new Client({
    host: miner.host,
    port: miner.port
  });

  return cgminer.connect()
    .then(function (client) {
      return Promise.props({
        version: client.version(),
        summary: client.summary(),
        pools: client.pools(),
      });
    })
    .then(function (response) {
      return MinerState.create(_.merge({
        miner: miner.id,
        event: 'ping',
        error: null,
        success: true,
      }, response));
    })
    .catch(function (error) {
      sails.log.warn(error);
      return MinerState.create({
        miner: miner.id,
        event: 'ping',
        error: error,
        success: false
      });
    });
}

/**
 * Update all miners for a user
 * @public
 */
function updateAll (user) {
  return Miner
    .find({ owner: user.id })
    .then(function (miners) {
      return _.map(miners, update);
    });
}

/**
 * @public
 */
function createUpdateInterval (miner) {
  setInterval(_.partial(updateInterval, miner), miner.interval * 1000);
}

/**
 * @private
 */
function updateInterval (miner) {
  sails.log('user', miner.owner, ': auto-updating state for miner', miner.id, 'interval', miner.interval);
  
  if (_.isEmpty(miner.state)) {
    return update(miner);
  }
  if (!_.isObject(miner.state)) {
    sails.log.warn('miner passed into updateInterval must populate() "state"');
    return;
  }

  var staleDate = moment().subtract(miner.interval, 'seconds');

  if (moment(miner.state.createdAt).isBefore(staleDate)) {
    return update(miner);
  }
  else {
    sails.info('miner', miner.id, 'state is current. not updating');
  }
}

exports.update = update;
exports.updateAll = updateAll;
exports.createUpdateInterval = createUpdateInterval;
exports.updateWorker = updateWorker;
