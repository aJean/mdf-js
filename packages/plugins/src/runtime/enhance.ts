/**
 * @file 封装一些增强方法提供给开发者使用
 */

export function mdfInfo() {
  console.log({
    pkg: 'mdf',
    version: process.env.MDF_VERSION,
    node: process.version,
  });
}
