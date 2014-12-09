var moment = require('moment');
var twix = require('twix');

/**
 * @param history List of MinerState sorted by createdAt
 */
function interpolateHistory (options) {
  var range = moment(options.begin).startOf('hour')
    .twix(moment(options.end).add(options.resolution, 'minutes'));
  var iterator = range.iterate(moment.duration({ minutes: options.resolution }));
  var interpolated = [ ];
  var history = new sails.api.MinerStateCollection(options.history);

  var keyframeComparator = function (keyframe) {
    return function _keyframeComparator(state) {
      var diff = moment(state.get('createdAt')).diff(keyframe, 'minutes');
      return diff > 0 && diff < options.resolution;
    };
  };

  for (var keyframe = iterator.next(); iterator.hasNext(); keyframe = iterator.next()) {
    var state = _.findLast(history.models, keyframeComparator(keyframe));
    interpolated.push({
      x: keyframe.toDate(),
      y: (state && state.getInstantaneousHashrate()) || 0
    });
  }

  return _.sortBy(interpolated, 'x');
}

module.exports = {
  interpolateHistory: interpolateHistory
};
