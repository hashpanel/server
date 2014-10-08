/**
* Pool.js
*
* A bitcoin mining Pool. These will be mainly defined as fixtures, with little
* practical need for users to define "custom" pools.  
*/

module.exports = {
  attributes: {
    name: {
      type: 'string',
      notNull: true
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

