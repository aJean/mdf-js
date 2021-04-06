"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

var _fs = require("fs");

var _utils = require("@mdfjs/utils");

var _input = _interopRequireDefault(require("./input"));

var _generate = _interopRequireDefault(require("./generate"));

var _version = _interopRequireDefault(require("./version"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @file 创建 mdf project，因为 install 可能会很慢，所以交给开发者自己选择时机执行
 */
const yargs = require('yargs'); // 默认项目路径 + 目录名，create-msfjs -p ./mdf-project


yargs.default('p', () => './mdf-project');

function _default() {
  return _ref.apply(this, arguments);
}

function _ref() {
  _ref = _asyncToGenerator(function* () {
    const opts = yargs.argv;
    const version = (0, _utils.getUserPkg)((0, _path.join)(__dirname, '../'), 'version');

    if ((0, _fs.existsSync)(opts.p)) {
      return (0, _utils.chalkPrints)([['error: ', 'red'], '无法创建已经存在的项目']);
    }

    if (opts.v) {
      return (0, _utils.chalkPrints)([[version, 'green']]);
    } // 信息输入


    const config = yield (0, _input.default)();
    let needLibs;

    switch (config.template) {
      case 'react':
        needLibs = ['mdfjs', '@mdfjs/react'];
        break;

      case 'vue':
        needLibs = ['mdfjs', '@mdfjs/vue'];
        break;

      case 'taro':
        return (0, _utils.chalkPrints)([['error: ', 'red'], '想多了，还不支持这个']);
    }

    const versions = yield (0, _version.default)(needLibs);

    if (!versions) {
      return (0, _utils.chalkPrints)([['error: ', 'red'], '未找到可用的 mdf lib 版本']);
    }

    (0, _generate.default)(Object.assign(config, versions, {
      // for local test
      createPath: opts.p,
      prettierOpts: JSON.stringify(require('@mdfjs/utils/assets/prettierrc.json'), null, 2)
    }));
    (0, _utils.chalkPrints)([['end:', 'yellow'], ' create project success']);
  });
  return _ref.apply(this, arguments);
}