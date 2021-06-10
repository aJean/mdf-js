"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _utils = require("@mdfjs/utils");

var _path = require("path");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @file web request api
 */
function _default(api, useTrace = false) {
  api.onCodeGenerate(function () {
    const Mustache = api.Mustache,
          paths = api.paths;
    const config = api.getConfig();
    const tpl = api.getFile((0, _path.join)(__dirname, 'http.tpl'));
    const content = Mustache.render(tpl, _objectSpread({
      axiosPath: require.resolve('axios')
    }, checkProxy(config)));
    api.writeFile(`${paths.absTmpPath}/request.ts`, (0, _utils.prettierFormat)(content));
  });

  if (useTrace) {
    api.addRuntimePlugin(() => require.resolve('../plugins/trace'));
  } // 导出到 mdf 命名空间


  api.addRuntimeExports(function () {
    return {
      specifiers: ['http'],
      source: `./request`
    };
  });
}

function checkProxy(config) {
  const server = config.workServer;
  return {
    useProxy: Boolean(server.proxy),
    usePort: Number(server.port) || 9000
  };
}