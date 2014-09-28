// api/policies/ModelPolicy.js

var _ = require('lodash');
var _super = require('sails-permissions/api/policies/ModelPolicy');

_.merge(exports, _super);
_.merge(exports, {

  // Extend with custom logic here by adding additional fields, methods, etc.

  /**
   * For example:
   *
   * foo: function (bar) {
   *   bar.x = 1;
   *   bar.y = 2;
   *   return _super.foo(bar);
   * }
   */
});
