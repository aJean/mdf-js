"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _utils = require("@mdfjs/utils");

/**
 * @file 处理全局样式
 */
function _default(api) {
  const cwd = api.cwd;
  const files = (0, _utils.globFind)(`${cwd}/src/styles/*`);

  if (files && files.length) {
    api.addImportsBehind(() => files);
  }
}