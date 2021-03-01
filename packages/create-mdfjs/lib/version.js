"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVersions = getVersions;
exports.versions = void 0;

var _request = _interopRequireDefault(require("request"));

var _utils = require("@mdfjs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file 获取最新的框架版本，稳定后会固定下来
 */
function getVersions() {
  return Promise.all([fetch('mdfjs'), fetch('@mdfjs/react')]).then(res => {
    return {
      mdfjs: res[0],
      react: res[1]
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

const versions = {
  mdfjs: '0.0.26',
  '@mdfjs/react': '0.0.28'
};
exports.versions = versions;