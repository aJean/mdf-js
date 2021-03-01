import mkdirp from 'mkdirp';
import fs from 'fs';
import chalk from 'chalk';
import { dirname, join } from 'path';

/**
 * @file 文件路径相关的工具类
 */

const _prefix = '005#7';

/**
 * 内部使用到的路径
 */
export function getPaths() {
  const cwd = process.cwd();

  return {
    absSrcPath: join(cwd, 'src'),
    absTmpPath: join(cwd, '.tmp'),
    absNodeModulesPath: join(cwd, 'node_modules'),
  };
}

/**
 * 判断文件是否存在
 */
export function isExist(path: string) {
  return fs.existsSync(path);
}

/**
 * 创建目录
 */
export function makeDir(path: string) {
  const isExist = fs.existsSync(path);

  if (!isExist) {
    fs.mkdirSync(path);
  }
}

/**
 * 安全写
 */
export function writeFile(path: string, data: string) {
  mkdirp.sync(dirname(path));
  fs.writeFileSync(path, data);
}

/**
 * 读取文件内容
 */
export function getFile(path: string) {
  if (fs.existsSync(path)) {
    return fs.readFileSync(path, 'utf-8');
  }

  return null;
}

/**
 * 带颜色的输出
 */
export function chalkPrint(msg: string, color: string) {
  const chalkFn = chalk[color];
  const chalkMsg = chalkFn ? chalkFn(msg) : msg;

  console.log(chalkMsg);
}

/**
 * 将 path 转化成 plugin obj 保存
 * 会自动生成唯一 id => { id， key, apply }
 */
export function resolvePresets(presets: string[]) {
  return presets.map((path: string) => {
    return pathToObj(path);
  });
}

/**
 * 解析插件 path
 */
export function pathToObj(path: string) {
  const id = path.replace('.ts', '');

  return {
    id,
    path,
    // 是否需要区分 esm 和 common
    apply() {
      const module = require(path);
      return esmExport(module);
    },
  };
}

/**
 * 处理 es 模块的 cjs 导出问题
 */
export function esmExport(module: any) {
  // return module.__esModule ? module.default : module;
  return module.default;
}

/**
 * deep array add
 */
export function deepArrayAdd(list: Function[], args: any, ret: any[]) {
  const toString = Object.prototype.toString;

  function add(data: any[]) {
    if (toString.call(data) === '[object Array]') {
      data.forEach(item => add(item));
    } else {
      ret.push(data);
    }
  }

  // 第一层执行 plugin fn，但是要处理返回值是 array 的情况
  list.forEach(fn => {
    const data = runInContext(fn, args);
    add(data);
  });

  return ret;
}

/**
 * 可以赋予更多的能力，比如沙盒环境
 */
export function runInContext(fn: Function, args: any[], context?: any) {
  return fn.apply(context, args);
}
