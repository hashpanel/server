/**
* Currency.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  autoCreatedBy: false,
  autoCreatedAt: false,
  autoUpdatedAt: false,
  enableOwnership: false,

  attributes: {
    name: {
      type: 'string',
      notNull: true
    },
    abbreviation: {
      type: 'string',
      notNull: true
    },
    symbol: {
      type: 'string'
    },
    type: {
      type: 'string',
      enum: [
        'fiat',
        'sha256',
        'scrypt'
      ]
    }
  }
};

