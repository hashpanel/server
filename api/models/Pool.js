/**
* Pool.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
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

