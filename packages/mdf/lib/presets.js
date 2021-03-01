"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPresets;

var _core = require("@mdfjs/core");

var _utils = require("@mdfjs/utils");

/**
 * @file 收集 presets
 * @todo 插件载入顺序、异步插件、并行插件
 */
function getPresets(only) {
  const presets = [];
  const cwd = process.cwd();

  try {
    // builtin plugins
    const _getUserConfig = (0, _core.getUserConfig)(),
          plugins = _getUserConfig.plugins;

    presets.push(require.resolve('@mdfjs/plugins'), require.resolve('@mdfjs/plugins-web'), require.resolve('@mdfjs/plugins-lint')); // 合并 user config plugins，需不需要优先级?

    if (plugins && plugins.length) {
      presets.push(...plugins);
    } // 只有 dev 和 build 时才加载用户安装的插件集，避免无关的性能损耗


    const deps = only ? null : (0, _utils.getUserPkg)(cwd, 'dependencies');

    if (deps) {
      Object.keys(deps).forEach(name => {
        if (/^@mdfjs/.test(name)) {
          presets.push(require.resolve(`${cwd}/node_modules/${name}`));
        }
      });
    }
  } catch (e) {
    (0, _utils.errorPrint)(e);
  } finally {
    return presets;
  }
}