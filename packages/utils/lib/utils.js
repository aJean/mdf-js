"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prettierFormat = prettierFormat;
exports.chalkPrint = chalkPrint;
exports.chalkPrints = chalkPrints;
exports.errorPrint = errorPrint;
exports.compileErrorPrint = compileErrorPrint;
exports.globFind = globFind;
exports.registerRequire = registerRequire;
exports.getUserPkg = getUserPkg;
exports.genStaticPath = genStaticPath;
exports.genRoutesPath = genRoutesPath;
exports.genModelsPath = genModelsPath;
exports.genAppPath = genAppPath;
exports.genServerPath = genServerPath;

var _prettier = _interopRequireDefault(require("prettier"));

var _chalk = _interopRequireDefault(require("chalk"));

var _glob = _interopRequireDefault(require("glob"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @file mdf utils
 */
const prettierOpts = require('../assets/prettierrc.json');

function prettierFormat(data) {
  return _prettier.default.format(data, _objectSpread({
    parser: 'typescript'
  }, prettierOpts));
}
/**
 * 彩色打印
 */


function chalkPrint(msg, color) {
  const chalkFn = _chalk.default[color];
  const chalkMsg = chalkFn ? chalkFn(msg) : msg;
  console.log(chalkMsg);
}
/**
 * 自由组合彩色打印
 */


function chalkPrints(tokens) {
  const ret = tokens.map(token => {
    if (typeof token === 'string') {
      return token;
    } else {
      const chalkFn = _chalk.default[token[1]];
      return chalkFn ? chalkFn(token[0]) : token[0];
    }
  }).join('');
  console.log(ret);
}
/**
 * 进程错误
 */


function errorPrint(e) {
  chalkPrint(e.message, 'red');
  console.error(e.stack);
}
/**
 * 编译错误
 */


function compileErrorPrint(msg) {
  chalkPrints([[`error: `, 'red'], ` compile failed`]);
  console.log(msg);
}
/**
 * 查找文件
 */


function globFind(pattern, opts) {
  return _glob.default.sync(pattern, opts);
}
/**
 * node require 支持 .ts
 * 目前只兼容 config 和 plugins 目录
 */


function registerRequire(Files, basePath) {
  try {
    const only = [...Files, `${basePath}/plugins`];

    const tsconfig = require(`${basePath}/tsconfig.json`);

    const mdfPath = tsconfig.compilerOptions.paths.mdf[0]; // link 开发需要与 tsconfig 的 alis 一致

    const alias = {
      mdf: `${basePath}/${mdfPath}`
    };

    require('@babel/register')({
      presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-typescript')],
      ignore: [/node_modules/],
      only,
      extensions: ['.ts', '.js'],
      babelrc: false,
      cache: false,
      plugins: [[require('babel-plugin-module-resolver'), {
        alias
      }]]
    });
  } catch (e) {
    errorPrint(e);
  }
}
/**
 * 查找用户的 package.json
 */


function getUserPkg(path, prop) {
  try {
    const pkg = require(`${path}/package.json`);

    return prop ? pkg[prop] : pkg;
  } catch (e) {
    return undefined;
  }
}
/**
 * 根据 project type 适配文件路径，不允许工程模块私自修改
 */


function genStaticPath(api) {
  const _api$getConfig = api.getConfig(),
        project = _api$getConfig.project;

  switch (project.type) {
    case 'hybrid':
      return 'src/client';

    case 'web':
      return 'src';

    default:
      return 'src';
  }
}
/**
 * 路由目录 path
 */


function genRoutesPath(api) {
  return `${genStaticPath(api)}/pages`;
}
/**
 * 数据目录 path
 */


function genModelsPath(api) {
  return `${genStaticPath(api)}/models`;
}
/**
 * app config path
 */


function genAppPath(api) {
  return `${genStaticPath(api)}/app.ts`;
}

function genServerPath(api) {
  const _api$getConfig2 = api.getConfig(),
        project = _api$getConfig2.project;

  switch (project.type) {
    case 'hybrid':
      return 'src/server';

    case 'node':
      return 'src';

    default:
      return 'src';
  }
}