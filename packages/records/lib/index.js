"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVersions = getVersions;
exports.getRelease = getRelease;
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
  change: 'Spinner 优化'
}, {
  version: '0.1.12',
  change: 'env 在 config 时进行初始化'
}, {
  version: '0.1.13',
  change: 'mdf-vue 发布'
}, {
  version: '0.1.14',
  change: 'vue template 问题修复'
}, {
  version: '0.1.15',
  change: '日常优化 + 响应式方案调整'
}, {
  version: '0.1.16',
  change: 'workserver 支持修改 port'
}, {
  version: '0.1.17',
  change: '增加 trace 功能'
}, {
  version: '0.1.18',
  change: 'request 增强，info 添加提示'
}, {
  version: '0.1.19',
  change: '日常优化'
}, {
  version: '0.1.20',
  change: '日常优化'
}, {
  version: '0.1.21',
  change: '@mdfjs/server 重构'
}, {
  version: '0.1.22',
  change: 'work proxy 日志'
}, {
  version: '0.1.23',
  change: '日常优化'
}, {
  version: '0.1.24',
  change: 'sass-loader 问题修复'
}, {
  version: '0.1.25',
  change: 'sass-loader 问题修复'
}, {
  version: '0.1.26',
  change: 'plugins cli 命令执行修复'
}, {
  version: '0.1.27',
  change: '插件系统升级'
}, {
  version: '0.1.28',
  change: '插件系统升级'
}, {
  version: '0.2.0',
  change: '升级依赖'
}, {
  version: '0.2.1',
  change: ''
}];
/**
 * 取得所有发不过的版本
 */

function getVersions() {
  return records.map(record => record.version);
}
/**
 * 取得特定版本的 release
 */


function getRelease(vid) {
  const data = records.find(record => record.version == vid);
  return data ? data.change : undefined;
}

var _default = records;
exports.default = _default;