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
    coordinates: {
      type: 'json'
    },
    powerCost: {
      // $ per Whr
      type: 'float'
    },
    initialCost: {
      type: 'float'
    },
    monthlyRecurring: {
      // $ per month
      type: 'float'
    }

  }
};

