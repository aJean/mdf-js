"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getYapiToken = getYapiToken;
exports.loadUserProxy = loadUserProxy;
exports.getCorsHeaders = getCorsHeaders;
exports.yapi_cookie = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file utils
 */
const yapi_cookie = '_yapi_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjExLCJpYXQiOjE2MTg0NTkwNDQsImV4cCI6MTYxOTA2Mzg0NH0.8SEf_LQhUsZHiJ1cMAnDE6XlRKbOXu8t4LyE3PvjpaY; _yapi_uid=11';
/**
 * yapi 的 cookie
 */

exports.yapi_cookie = yapi_cookie;

function getYapiToken() {
  return yapi_cookie;
}
/**
 * 实时读取 proxy.json，而 serverOpts 只起到开关的作用
 */


function loadUserProxy() {
  try {
    const path = `${process.cwd()}/config/proxy.json`;

    const content = _fs.default.readFileSync(path, 'utf-8');

    const module = JSON.parse(content);
    return module;
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}
/**
 * 允许的跨区头
 */


function getCorsHeaders() {
  return ['X-Requested-With', 'Content-Type', 'Accept', 'X-Mdf-Proxy', 'X-Trace-Id', 'X-Analysis', 'Authorization'].join(',');
}