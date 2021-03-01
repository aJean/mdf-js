"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = require("path");

/**
 * @file polyfill 配置
 */
function _default(api) {
  api.describe({
    key: 'polyfill',
    config: {
      schema(joi) {
        return joi.array();
      }

    }
  });
  api.addPolyfill(() => ['./polyfill']);
  api.onCodeGenerate(() => {
    const Mustache = api.Mustache,
          paths = api.paths;
    const tpl = api.getFile((0, _path.join)(__dirname, 'polyfill.tpl'));
    const config = api.getConfig();
    const content = Mustache.render(tpl, {
      modules: config.polyfill || null
    });
    api.writeFile(`${paths.absTmpPath}/polyfill.ts`, content);
  });
}

;