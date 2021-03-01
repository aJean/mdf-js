"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getYapiToken = getYapiToken;
exports.loadUserProxy = loadUserProxy;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file utils
 */
function getYapiToken() {
  // 应该申请一个通用最高权限的 token
  return '_yapi_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjY3LCJpYXQiOjE2MDk3NjY0NzcsImV4cCI6MTYxMDM3MTI3N30.bxB_UxDVUEtBQbB0F6JL_EZZp2KStNvMD94_d0aufjk;_yapi_uid=67';
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