"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _dotenv = require("dotenv");

var _fs = require("fs");

/**
 * @file 处理 env 变量和 define
 */
const mdf_keys = ['MDF_VERSION', 'MDF_ENV'];

function _default(opts) {
  const envFiles = opts.envs;
  const defines = opts.defines || {};

  if (!opts.MDF_ENV) {
    throw new Error("can't find MDF_ENV in mdf config !");
  }

  mdf_keys.forEach(key => {
    defines[key] = opts[key];
  });
  envFiles.forEach(path => {
    const parsed = (0, _dotenv.parse)((0, _fs.readFileSync)(path, 'utf-8')) || {};
    Object.keys(parsed).forEach(key => {
      defines[key] = parsed[key];
    });
  });
  return defines;
}