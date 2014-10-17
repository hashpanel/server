/**
* Site.js
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
    location: {
      type: 'string'
    },
    powerCost: {
      // $ per Whr
      type: 'float',
      defaultsTo: 0
    },
    initialCost: {
      type: 'float',
      defaultsTo: 0
    },
    monthlyRecurring: {
      // $ per month
      type: 'float',
      defaultsTo: 0
    }

  }
};

