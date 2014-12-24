/**
 * NewsController
 *
 * @description :: Server-side logic for managing news
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var request = require('request');

module.exports = {
  index: function (req, res) {
    req.pipe(request('http://newsbtc.com/feed')).pipe(res);
  }
};

