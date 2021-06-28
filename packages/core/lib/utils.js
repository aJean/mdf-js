"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPaths = getPaths;
exports.isExist = isExist;
exports.makeDir = makeDir;
exports.writeFile = writeFile;
exports.getFile = getFile;
exports.chalkPrint = chalkPrint;
exports.resolvePresets = resolvePresets;
exports.pathToObj = pathToObj;
exports.esmExport = esmExport;
exports.deepArrayAdd = deepArrayAdd;
exports.runInContext = runInContext;
exports.runPlugin = runPlugin;
exports.parseError = parseError;

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _fs = _interopRequireDefault(require("fs"));

var _chalk = _interopRequireDefault(require("chalk"));

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file 文件路径相关的工具类
 */
const _prefix = '005#7';
/**
 * 内部使用到的路径
 */

function getPaths() {
  const cwd = process.cwd();
  return {
    absSrcPath: (0, _path.join)(cwd, 'src'),
    absTmpPath: (0, _path.join)(cwd, '.tmp'),
    absNodeModulesPath: (0, _path.join)(cwd, 'node_modules')
  };
}
/**
 * 判断文件是否存在
 */


function isExist(path) {
  return _fs.default.existsSync(path);
}
/**
 * 创建目录
 */


function makeDir(path) {
  const isExist = _fs.default.existsSync(path);

  if (!isExist) {
    _fs.default.mkdirSync(path);
  }
}
/**
 * 安全写
 */


function writeFile(path, data) {
  _mkdirp.default.sync((0, _path.dirname)(path));

  _fs.default.writeFileSync(path, data);
}
/**
 * 读取文件内容
 */


function getFile(path) {
  if (_fs.default.existsSync(path)) {
    return _fs.default.readFileSync(path, 'utf-8');
  }

  return null;
}
/**
 * 带颜色的输出
 */


function chalkPrint(msg, color) {
  const chalkFn = _chalk.default[color];
  const chalkMsg = chalkFn ? chalkFn(msg) : msg;
  console.log(chalkMsg);
}
/**
 * 将 path 转化成 plugin obj 保存
 * 会自动生成唯一 id => { id， key, apply }
 */


function resolvePresets(presets) {
  return presets.map(path => {
    return pathToObj(path);
  });
}
/**
 * 解析插件 path
 */


function pathToObj(path) {
  const id = path.replace('.ts', '');
  return {
    id,
    path,

    // 是否需要区分 esm 和 common
    apply() {
      const module = require(path);

      return esmExport(module);
    }

  };
}
/**
 * 处理 es 模块的 cjs 导出问题
 */


function esmExport(module) {
  // return module.__esModule ? module.default : module;
  return module.default;
}
/**
 * deep array add
 */


function deepArrayAdd(list, args, ret) {
  const toString = Object.prototype.toString;

  function add(data) {
    if (toString.call(data) === '[object Array]') {
      data.forEach(item => add(item));
    } else {
      ret.push(data);
    }
  } // 第一层执行 plugin fn，但是要处理返回值是 array 的情况


  list.forEach(fn => {
    const data = runInContext(fn, args);
    add(data);
  });
  return ret;
}
/**
 * 可以赋予更多的能力，比如沙盒环境
 */


function runInContext(fn, args, context) {
  return fn.apply(context, args);
}
/**
 * 执行并返回 promise
 */


function runPlugin(plugin, method) {
  return new Promise(function (resolve, reject) {
    const ret = plugin[method]();

    if (ret && ret.then) {
      ret.then(() => resolve(null)).catch(e => reject(e));
    } else {
      resolve(null);
    }
  });
}
/**
 * 工程错误解析
 */


function parseError(msg) {
  if (/configuration.entry/.test(msg)) {
    return 'no entry found, maybe you need mdf-react、mdf-vue or mdf-node';
  } else {
    return msg;
  }
}