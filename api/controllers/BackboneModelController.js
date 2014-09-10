var _ = require('lodash');

ParentController = require('sails-backbone/api/controllers/BackboneModelController');

_.extend(exports, ParentController);
_.extend(exports, {

  /**
   * Custom override logic goes in here. For example:
   *
   * find: function (req, res) {
   *   req.param.limit = 10;
   *   ParentController.find(req, res);
   * }
   *
   */

});
