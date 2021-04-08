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
    'node-version': process.version,
    'mdf-version': process.env.MDF_VERSION,
    'pro-version': process.env.PRO_VERSION,
    'pro-name': process.env.PRO_NAME
  });
}