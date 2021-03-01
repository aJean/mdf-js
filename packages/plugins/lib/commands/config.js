"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _core = require("@mdfjs/core");

/**
 * @file 读取户配置，在开发时可以用来做配置检查
 */
function _default(api) {
  api.registerCommand({
    name: 'config',

    fn() {
      const config = (0, _core.getUserConfig)();
      console.log(config);
    }

  });
}