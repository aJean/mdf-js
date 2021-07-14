"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _eslint = require("eslint");

var _eslintOpts = _interopRequireDefault(require("./eslintOpts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file eslint
 */
function _default(files, cwd) {
  if (!files) {
    files = [`${cwd}/src/**/*.{ts,tsx}`];
  } // @ts-ignore 使用 cwd 从当前目录查找 plugins


  const eslint = new _eslint.ESLint({
    cwd: __dirname,
    overrideConfig: _eslintOpts.default
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