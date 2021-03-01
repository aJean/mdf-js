"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _utils = require("@mdfjs/utils");

var _path = require("path");

/**
 * @file web request api
 */
function _default(api) {
  api.onCodeGenerate(function () {
    const Mustache = api.Mustache,
          paths = api.paths;
    const config = api.getConfig();
    const tpl = api.getFile((0, _path.join)(__dirname, 'request.tpl'));
    const content = Mustache.render(tpl, {
      toolPath: require.resolve('@medlinker/apitool/request'),
      useProxy: checkProxy(config)
    });
    api.writeFile(`${paths.absTmpPath}/request.ts`, (0, _utils.prettierFormat)(content));
  });
  api.addRuntimePlugin(() => require.resolve('../plugins/request'));
  api.addRuntimeExports(function () {
    return {
      specifiers: ['request'],
      source: `./request`
    };
  });
}

function checkProxy(config) {
  return Boolean(config.workServer && config.workServer.proxy);
}