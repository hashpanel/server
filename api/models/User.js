// api/models/User.js

var _ = require('lodash');
var _super = require('sails-permissions/api/models/User');

_.merge(exports, _super);
_.merge(exports, {

  afterCreate: function (user, next) {
    Promise
      .all(_.each(_super.afterCreate, Promise.promisify))
      .then(function (results) {
        return Promise.all([
          Group.create({
            name: 'default',
            createdBy: user.id
          }),
          Site.create({
            name: 'default',
            createdBy: user.id,
          })
        ]);
      })
      .then(function () {
        next();
      })
      .catch(next);
  }
});
