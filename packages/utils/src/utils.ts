import prettier from 'prettier';
import chalk from 'chalk';
import glob from 'glob';

/**
 * @file mdf utils
 */

const prettierOpts = require('../assets/prettierrc.json');
export function prettierFormat(data: string) {
  return prettier.format(data, { parser: 'typescript', ...prettierOpts });
}

/**
 * 彩色打印
 */
export function chalkPrint(msg: string, color: string) {
  const chalkFn = chalk[color];
  const chalkMsg = chalkFn ? chalkFn(msg) : msg;

  console.log(chalkMsg);
}

/**
 * 自由组合彩色打印
 */
export function chalkPrints(tokens: any[]) {
  const ret = tokens
    .map((token) => {
      if (typeof token === 'string') {
        return token;
      } else {
        const chalkFn = chalk[token[1]];
        return chalkFn ? chalkFn(token[0]) : token[0];
      }
    })
    .join('');

  console.log(ret);
}

/**
 * 进程错误
 */
export function errorPrint(e: Error) {
  chalkPrint(e.message, 'red');
  console.error(e.stack);
}

/**
 * 编译错误
 */
export function compileErrorPrint(msg: string) {
  chalkPrints([[`error: `, 'red'], ` compile failed`]);
  console.log(msg);
}

/**
 * 查找文件
 */
export function globFind(pattern: string, opts?: glob.IOptions) {
  return glob.sync(pattern, opts);
}

/**
 * node require 支持 .ts
 * 目前只兼容 config 和 plugins 目录
 */
export function registerRequire(Files: string[], basePath: string) {
  try {
    const only = [...Files, `${basePath}/plugins`];
    const tsconfig = require(`${basePath}/tsconfig.json`);
    const mdfPath = tsconfig.compilerOptions.paths.mdf[0];

    // link 开发需要与 tsconfig 的 alis 一致
    const alias = { mdf: `${basePath}/${mdfPath}` };

    require('@babel/register')({
      presets: [require.resolve('@babel/preset-env'), require.resolve('@babel/preset-typescript')],
      ignore: [/node_modules/],
      only,
      extensions: ['.ts', '.js'],
      babelrc: false,
      cache: false,
      plugins: [[require('babel-plugin-module-resolver'), { alias }]],
    });
  } catch (e) {
    errorPrint(e);
  }
}

/**
 * 查找用户的 package.json
 */
export function getUserPkg(path: string, prop?: string) {
  try {
    const pkg = require(`${path}/package.json`);
    return prop ? pkg[prop] : pkg;
  } catch (e) {
    return undefined;
  }
}