/**
 * Created by xeonwell on 2017-02-21.
 */

let fs = require('fs');
let path = require('path');
let ejs = require('ejs');
let queryString = require('querystring');
let debug = require('debug')('MockServer:mockUrlHandler');

let config = require('./config');

let cachedFilesMap = {};

let mockDir = path.join(__dirname, '../mock');
// debug(mockDir);

/**
 *
 * @param url
 * @param req
 * @returns {Promise}
 */
module.exports = function (url, req) {
  return new Promise(function (resolve, reject) {
    let jsonFile = path.join(mockDir, url.pathname + '.json');
    let render = (file) => {
      let postBody = [];
      req.on('data', function (data) {
        postBody.push(data);
      });
      req.on('end', function () {
        req.postBody = queryString.parse(Buffer.concat(postBody).toString());
        resolve(JSON.parse(ejs.render(file, {query: req.query, postBody: req.postBody })))
      });
    };
    let cachedFile = cachedFilesMap[jsonFile];
    if (cachedFile) {
      render(cachedFile);
      return;
    }
    fs.readFile(jsonFile, function (err, result) {
      if (err) return reject(err);
      let f = result.toString();
      if (config.isCacheFile) {
        cachedFilesMap[jsonFile] = f;
      }
      render(f);
    })
  })
}
