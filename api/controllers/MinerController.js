/**
 * MinerController
 *
 * @description :: Server-side logic for managing Miners
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  /**
   * @param begin Date
   * @param end Date
   * @param resolution Integer (minutes)
   */
  chart: function (req, res) {
    if (_.isNaN(parseInt(req.query.begin))) {
      return res.json(400, { error: '"begin" must be a unix timestamp' });
    }
    if (_.isNaN(parseInt(req.query.end))) {
      return res.json(400, { error: '"end" must be a unix timestamp' });
    }
    if (req.query.begin > req.query.end) {
      return res.json(400, { error: '"begin" must be smaller than "end"' });
    }
    if (_.isNaN(parseInt(req.query.resolution))) {
      return res.json(400, { error: '"resolution" must be a valid number of minutes' });
    }
    if (_.isNaN(parseInt(req.params.id))) {
      return res.json(400, { error: '"id" must be a valid miner id' });
    }

    MinerService.getChartData(req)
      .then(function (data) {
        res.json(data);
      });
  }
};
