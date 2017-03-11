/**
 * Created by xeonwell on 2017-02-21.
 */

let config = require('./config')

/**
 * successRate
 * @returns {boolean}
 */
module.exports.isSuccessful = function () {
  let r = Math.random();
  return r < config.successRate
};
/**
 * wrapper for successful
 * @param result
 * @returns {{status: number, data: *}}
 */
module.exports.success = function (result) {
  return {
    status: 1,
    data: result
  }
};
/**
 * wrapper for failed
 * @param err
 * @returns {{status: number, data: (*|string)}}
 */
module.exports.fail = function (err) {
  return {
    status: 2,
    data: err || 'random error occurred'
  }
};

module.exports.log = function (m) {
  if (!config.isDebug || !m) return
  arguments.length === 1 ? console.log(m) : console.log.apply(console, slice.call(arguments))
}
