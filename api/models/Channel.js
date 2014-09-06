/**
* Channel.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    miner: {
      model: 'Miner'
    },
    host: {
      type: 'string'
    },
    port: {
      type: 'integer'
    },
    username: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    protocol: {
      type: 'string'
    }
  }
};

