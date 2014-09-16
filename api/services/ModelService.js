// api/services/ModelService.js

var _ = require('lodash');
var _super = require('sails-permissions/api/services/ModelService');

function ModelService () { }

ModelService.prototype = Object.create(_super);
_.extend(ModelService.prototype, {

  // Extend with custom logic here by adding additional fields and methods,
  // and/or overriding methods in the superclass.

  /**
   * For example:
   *
   * foo: function (bar) {
   *   bar.x = 1;
   *   bar.y = 2;
   *   return _super.foo.call(this, bar);
   * }
   */
});

module.exports = new ModelService();
