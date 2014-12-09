var moment = require('moment');
var twix = require('twix');

/**
 * @param history List of MinerState sorted by createdAt
 */
function interpolateHistory (options) {
  console.log('interpolateHistory begin:', options.begin);
  console.log('interpolateHistory end:', options.end);
  console.log('interpolateHistory resolution:', options.resolution);

  var range = moment(options.begin).twix(moment(options.end));
  var iterator = range.iterate(moment.duration({ minutes: options.resolution }));
  var interpolated = [ ];
  var history = new sails.api.MinerStateCollection(options.history);

  for (var keyframe = iterator.next(); iterator.hasNext(); keyframe = iterator.next()) {
    var state = history.find(function (state) {
      var diff = moment(state.get('createdAt')).diff(keyframe, 'minutes');
      return diff > 0 && diff < options.resolution;
    });
    interpolated.push({
      x: keyframe.toDate(),
      y: (state && state.getInstantaneousHashrate()) || 0
    });
  }

  return interpolated;
}

module.exports = {
  interpolateHistory: interpolateHistory
};
