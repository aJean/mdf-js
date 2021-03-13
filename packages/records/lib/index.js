"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @file 同步所有的包一起更新，每次发布需要手动添加
 */
const records = [{
  version: '0.1.7',
  change: 'publicPath 相关更新'
}, {
  version: '0.1.8',
  change: 'request 通过参数决定是否启用代理模式'
}, {
  version: '0.1.9',
  change: '抽象 project 配置'
}, {
  version: '0.1.10',
  change: 'Spinner 类加入 utils'
}, {
  version: '0.1.11',
  change: '还没想好'
}];
var _default = records;
exports.default = _default;