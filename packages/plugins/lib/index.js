"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

/**
 * @file 内部插件集
 *       顺序不可变否则收集的信息不完整: runtime、export、defineConfig
 */
function _default() {
  return {
    presets: [require.resolve('./commands/help'), require.resolve('./commands/build'), require.resolve('./commands/dev'), require.resolve('./runtime/polyfill'), require.resolve('./runtime/plugin'), require.resolve('./runtime/style'), require.resolve('./dynamicExport'), require.resolve('./pluginConfig')]
  };
}