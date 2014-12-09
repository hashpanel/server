var BackboneHook = require('sails-backbone/api/hooks/backbone-api');
var _ = require('lodash');

module.exports = function (sails) {
  return _.extend({ 
    configure: function () {
      sails.api = require('hashware-backbone-client').getNamespace();
    }
  }, BackboneHook(sails));
};
