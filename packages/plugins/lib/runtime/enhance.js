"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mdfInfo = mdfInfo;

/**
 * @file 封装一些增强方法提供给开发者使用
 */
function mdfInfo() {
  console.log({
    pkg: 'mdf',
    version: process.env.MDF_VERSION,
    node: process.version
  });
}