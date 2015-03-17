// api/models/User.js

var _ = require('lodash');
var _super = require('sails-permissions/api/models/User');

_.merge(exports, _super);
_.merge(exports, {

  afterCreate: function (user, next) {
    sails.log('User.afterCreate in hashpanel-server', user);
    Promise
      .all(_.each(_super.afterCreate, function (afterCreate) {
        return new Promise(function (resolve, reject) {
          afterCreate(user, function (err) {
            if (err) return reject(err);

            resolve();
          });
        });
      }))
      .then(function () {
        return Promise.all([
          Group.create({
            name: 'default',
            createdBy: user.id,
            owner: user.id
          }),
          Site.create({
            name: 'default',
            createdBy: user.id,
            owner: user.id
          })
        ]);
      })
      .then(function () {
        next();
      })
      .catch(next);
  }
});
