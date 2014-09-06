/**
 * BackbonejsController
 *
 * @description :: Server-side logic for managing backbonejs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var SailsBackbone = require('sails-backbone');

module.exports = {
  index: function (req, res, next) {
    res.json(SailsBackbone.generate(sails, pkg));
  }
};

