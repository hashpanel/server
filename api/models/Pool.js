/**
* Pool.js
*
* A bitcoin mining Pool. These will be mainly defined as fixtures, with little
* practical need for users to define "custom" pools.  
*/

module.exports = {
  autoCreatedBy: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,

  enableOwnership: false,

  attributes: {
    name: {
      type: 'string',
      primaryKey: true
    },
    url: {
      type: 'string',
      notNull: true
    },
    workers: {
      collection: 'PoolWorker',
      via: 'pool'
    }
  }
};

