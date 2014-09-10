/**
 * BackboneModel
 */
var _ = require('lodash');

_.merge(exports, require('sails-backbone/api/models/BackboneModel'));
_.merge(exports, {
  connection: 'sessionCache'
});
