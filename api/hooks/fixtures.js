module.exports = function (sails) {
  return {
    initialize: function (next) {
      sails.after('hook:orm:loaded', function () {
        Promise.all([
            loadDevices(),
            loadPools()
          ])
          .then(function () {
            next();
          })
          .catch(function (error) {
            //sails.log.warn(error);
            next();
          });

      });
    }
  };
};

function loadDevices () {
  var devices = require('../../config/fixtures/devices');

  return Promise.all(_.map(devices, function (device) {
    return MinerDevice.create(device);
  }));
}

function loadPools () {
  var pools = require('../../config/fixtures/pools');

  return Promise.all(_.map(pools, function (pool) {
    return Pool.create(pool);
  }));
}
