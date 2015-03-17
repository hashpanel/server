var moment = require('moment');
//var Client = require('cgminer-api').client;

function updateWorker (worker) {
  var cgminer = getClient(worker.miner);

  return MinerService.removeWorker(worker)
    .then(function (status) {
      return MinerService.createWorker(worker);
    });
}

function removeWorker (worker) {
  var cgminer = getClient(worker.miner);

  return cgminer.connect()
    .then(function () {
      return cgminer.removepool(worker.cgminerId);
    })
    .then(function (status) {
      return MinerState.create({
        createdBy: worker.miner.createdBy,
        miner: miner.id,
        event: 'removeWorker',
        success: true
      });
    })
    .catch(function (error) {
      return MinerState.create({
        createdBy: worker.miner.createdBy,
        miner: miner.id,
        event: 'removeWorker',
        error: error,
        success: false
      });
    });
}

/**
 * Add a pool worker to cgminer
 * @public
 */
function createWorker (worker) {
  var cgminer = getClient(worker.miner);

  return cgminer.connect()
    .then(function () {
      return cgminer.addpool([
        worker.pool.url,
        worker.name,
        worker.password
      ]);
    })
    .then(function () {
      return cgminer.pools();
    })
    .then(function (pools) {
      worker.cgminerId = pools.length;
      return worker.save();
    })
    .then(function (result) {
      return MinerState.create({
        createdBy: worker.miner.createdBy,
        miner: worker.miner.id,
        event: 'createWorker',
        error: null,
        success: true
      });
    })
    .catch(function (error) {
      return MinerState.create({
        createdBy: worker.miner.createdBy,
        miner: worker.miner.id,
        event: 'createWorker',
        error: error,
        success: false
      });
    });

}

/**
 * Contact a physical miner and store its state in a MinerState object
 * @public
 */
function update (miner) {
  if (_.isEmpty(miner.host)) {
    sails.log('not updating miner', miner.name, 'for user', miner.createdBy, '; no miner.host set');
    return;
  }
  var cgminer = getClient(miner);

  return cgminer.connect()
    .then(function () {
      return Promise.props({
        version: cgminer.version(),
        summary: cgminer.summary(),
        devs: cgminer.devs()
      });
    })
    .then(function (response) {
      return MinerState.create(_.merge({
        createdBy: miner.createdBy,
        miner: miner.id,
        event: 'ping',
        error: null,
        success: true,
      }, response));
    })
    .catch(function (error) {
      sails.log.warn(error);
      return MinerState.create({
        createdBy: miner.createdBy,
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
    .find({ createdBy: user.id })
    .then(function (miners) {
      return _.map(miners, update);
    });
}

/**
 * @public
 */
function createUpdateInterval (miner) {
  sails.log('creating update interval for miner', miner.name, 'interval', miner.interval);
  updateInterval(miner);
  setInterval(_.partial(updateInterval, miner), miner.interval * 1000);
}

/**
 * @private
 */
function updateInterval (miner) {
  sails.log('user', miner.createdBy, ': auto-updating state for miner', miner.id, 'interval', miner.interval);
  
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
    sails.log.info('miner', miner.id, 'state is current. not updating');
  }
}

function getClient (miner) {
  var Adapter = sails.config.cgminer.adapter;
  return new Adapter.client(miner);
}

function getChartData (req) {
  var begin = new Date(parseInt(req.query.begin));
  var end = new Date(parseInt(req.query.end));
  return MinerState.find({
      where: {
        createdAt: {
          '>': begin,
          '<': end
        },
        miner: req.params.id
      },
      sort: {
        createdAt: 1,
        miner: 1
      },
      limit: 1440 // (minutes in a day)
    })
    .then(function (history) {
      return MinerStateService.interpolateHistory({
        history: history,
        resolution: parseInt(req.query.resolution),
        begin: begin,
        end: end
      });
    });
}

module.exports = {
  update: update,
  updateAll: updateAll,
  createUpdateInterval: createUpdateInterval,
  updateWorker: updateWorker,
  createWorker: createWorker,
  removeWorker: removeWorker,
  getChartData: getChartData
};
