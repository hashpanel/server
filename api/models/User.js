// api/models/User.js

var _ = require('lodash');
var _super = require('sails-permissions/api/models/User');

_.merge(exports, _super);
_.merge(exports, {

  afterCreate: function (user, next) {
    Promise.all([
        Group.create({
          name: 'default',
          owner: user.id
        }),
        Site.create({
          name: 'default',
          owner: user.id,
        })
      ])
      .then(function () {
        next();
      })
      .catch(next);
  }
});
