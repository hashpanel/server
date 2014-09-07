/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var SailsBackbone = require('sails-backbone');

module.exports.bootstrap = function (next) {
  sails.services.passport.loadStrategies();

  BackboneModel.count().then(function (count) {
    if (count > 0) return next();
    createBackboneModels(next);
  });
};

function createBackboneModels (next) {
  var create = _.map(SailsBackbone.generate(sails, require('../package')).models, function (model, index) {
    model.index = index;
    return BackboneModel.create(model);
  });

  Promise
    .all(create)
    .then(function (models) {
      next();
    })
    .catch(next);
}
