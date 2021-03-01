"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _utils = require("@mdfjs/utils");

var _eslint = _interopRequireDefault(require("./eslint"));

var _stylelint = _interopRequireDefault(require("./stylelint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file styleLint、esLint、prettier
 * @todo 支持 vue
 */
function _default(api) {
  api.registerCommand({
    name: 'lint',

    fn(args) {
      const opts = require('stylelint-config-standard');

      const files = args.files;

      if (args.es) {
        (0, _eslint.default)(files, api.cwd);
      } else if (args.css || args.sass || args.less) {
        (0, _stylelint.default)(files, opts);
      } else {
        (0, _utils.errorPrint)({
          name: 'error',
          message: 'must pass a type parameter to mdflint'
        });
      }
    }

  });
}