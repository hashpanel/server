/**
* BackboneModel.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  autoPK: false,
  connection: 'sessionCache',
  schema: false,

  attributes: {
    name: {
      primaryKey: true
    }
  }
};

