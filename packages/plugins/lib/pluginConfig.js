"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _joi2types = _interopRequireDefault(require("joi2types"));

var _joi = _interopRequireDefault(require("joi"));

var _utils = require("@mdfjs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @file 将插件 describe 的 config 导出
 */
function _default(api) {
  // 配置 chainWebpack 的定义
  api.describe({
    key: 'chainWebpack',
    config: {
      schema(joi) {
        return joi.any();
      }

    }
  }); // 约定 api.describe 不能放在异步队列里执行

  api.onCodeGenerate({
    name: 'genPluginConfig',

    fn() {
      return _asyncToGenerator(function* () {
        const paths = api.paths,
              service = api.service;
        const pluginConfigs = service.pluginConfigs;
        let schemas = {};
        Object.keys(pluginConfigs).map(key => {
          const data = pluginConfigs[key];

          if (data.schema) {
            schemas[key] = data.schema;
          }
        });
        schemas = _joi.default.object(schemas).unknown();
        const data = yield (0, _joi2types.default)(schemas, {
          interfaceName: 'IConfigPlugins',
          bannerComment: '/** plugin interface **/'
        });
        api.writeFile(`${paths.absTmpPath}/plugins/pluginConfig.d.ts`, (0, _utils.prettierFormat)(data));
      })();
    }

  });
}