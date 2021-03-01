/**
 * @file 用户项目安装的模块 - mdf
 *       types.d.ts 过 ts 验证
 *       tsconfig paths 解决开发环境 mdf link
 *       try catch 解决开发环境没生成 moduleExports.ts 之前报错
 */

let ex = require('./lib/cjs');

try {
  const moduleExports = require('@@/moduleExports');
  ex = Object.assign(ex, moduleExports);
} catch (e) {}

module.exports = ex;
