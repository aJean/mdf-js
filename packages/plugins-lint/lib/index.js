"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _utils = require("@mdfjs/utils");

var _eslint = _interopRequireDefault(require("./eslint"));

var _stylelint = _interopRequireDefault(require("./stylelint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(api) {
  api.registerCommand({
    name: 'lint',

    fn(opts) {
      const config = require('stylelint-config-standard');

      const files = opts.files;

      if (opts.es) {
        (0, _eslint.default)(api, files);
      } else if (opts.css || opts.scss || opts.less) {
        (0, _stylelint.default)(files, config);
      } else {
        (0, _utils.errorPrint)({
          name: 'error',
          message: 'must pass a type parameter to mdf-lint'
        });
      }
    }

  });
}