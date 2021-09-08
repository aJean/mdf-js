"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _utils = require("@mdfjs/utils");

var _eslint = require("eslint");

var _eslintConfig = _interopRequireDefault(require("./eslintConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file eslint
 */
function _default(api, files) {
  const cwd = api.cwd; // 加载必要的 work plugin

  let config = _eslintConfig.default;
  const deps = (0, _utils.getUserPkg)(cwd, 'dependencies');
  ['@mdfjs/vue', '@mdfjs/react', '@mdfjs/node'].forEach(name => {
    if (deps[name] !== undefined) {
      try {
        const plugin = require(`${cwd}/node_modules/${name}`);

        plugin.lint && (config = plugin.lint(config));
      } catch (e) {
        (0, _utils.errorPrint)({
          name: 'error',
          message: e.message
        });
      }
    }
  }); // @ts-ignore 使用 cwd 从当前目录查找 plugins

  const eslint = new _eslint.ESLint({
    cwd: __dirname,
    overrideConfig: config
  });
  Promise.all([eslint.lintFiles(files), eslint.loadFormatter('stylish')]).then(res => {
    const list = res[0];
    const formatter = res[1];
    console.log(formatter.format(list));

    if (list.some(data => data.errorCount)) {
      process.exit(1);
    }
  });
}