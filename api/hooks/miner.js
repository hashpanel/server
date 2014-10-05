module.exports = function (sails) {
  return {
    /**
     * Initialize update intervals for all registered miners
     */
    initialize: function (next) {
      sails.after('hook:orm:loaded', function () {
        Miner.find()
          .populate('state')
          .then(function (miners) {
            _.map(miners, function (miner) {
              MinerService.createUpdateInterval(miner);
            });
            next();
          })
          .catch (function (error) {
            sails.log.error('miner updater initialization hook encountered an error', error);
            next(error);
          });
      });
    }
  };
};
