"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getVersions;

var _request = _interopRequireDefault(require("request"));

var _utils = require("@mdfjs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file 获取最新的框架版本，稳定后会固定下来
 */
function getVersions(needLibs) {
  if (!needLibs || !needLibs.length) {
    return undefined;
  }

  const reqs = needLibs.map(lib => fetch(lib));
  return Promise.all(reqs).then(res => {
    return {
      [needLibs[0]]: res[0],
      [needLibs[1]]: res[1]
    };
  }).catch(e => {
    (0, _utils.errorPrint)(e);
    return undefined;
  });
}

function fetch(name) {
  // 淘宝源版本可能会滞后，但是不需要代理
  const url = `https://registry.npm.taobao.org/${name}`;
  return new Promise(function (resolve, reject) {
    _request.default.get({
      url,
      headers: {
        accept: 'application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*',
        agent: 'request'
      }
    }, function (error, res) {
      if (error) {
        return reject(error);
      }

      try {
        const data = res.toJSON();
        const version = JSON.parse(data.body)['dist-tags'].latest;
        resolve(version);
      } catch (error) {
        reject(error);
      }
    });
  });
}