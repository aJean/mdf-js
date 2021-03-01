"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @file 同步所有的包一起更新，每次发布需要手动添加
 */
const records = [{
  version: '0.0.17',
  change: 'publicPath 相关更新'
}, {
  version: '0.0.18',
  change: 'request 通过参数决定是否启用代理模式'
}];
var _default = records;
exports.default = _default;