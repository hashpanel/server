/**
 * MinerController
 *
 * @description :: Server-side logic for managing Miners
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * Query and return the current miner status
   */
  current: function (req, res) {
    var id = req.params.id;

    Miner
      .find(req.params)
      .populate('connection')
      .then(function (miner) {
        return MinerService.update(miner);
      })
      .then(function (state) {
        res.json(state);
      });
  }
	
};

