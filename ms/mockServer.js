/**
 * Created by xeonwell on 2017-03-11.
 */

let debug = require('debug')('MockServer:server');
let config = require('./config');
let httpProxy = require('http-proxy');
let proxy = httpProxy.createProxyServer({});
let mockUrlHandler = require('./mockUrlHandler');
let funcs = require('./funcs');
let parseUrl = require('parseurl');

debug('proxy -> ' + config.proxyOptions.target);

module.exports = function (req, res, next) {

  debug(req.url);
  if (!config.isMockEnabled) {
    debug('mock server is not enabled, go to proxy server');
    proxy.web(req, res, config.proxyOptions);
    return;
  }

  if (!funcs.isSuccessful()) {
    // debug('random error');
    res.json(funcs.fail());
    return;
  }
  let objUrl = parseUrl(req);

  if (objUrl && objUrl.pathname && objUrl.pathname.length > 0) {
    mockUrlHandler(objUrl, req).then(function (json) {
      debug('find mock json, output...');
      res.json(funcs.success(json))
    }).catch(function (error) {
      // debug('not found, ~> proxy');
      proxy.web(req, res, config.proxyOptions)
    })
  }

  // next();
}
