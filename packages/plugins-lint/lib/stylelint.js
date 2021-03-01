"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _stylelint = _interopRequireDefault(require("stylelint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file stylelint
 */
function _default(files, opts) {
  opts.extends = require.resolve('stylelint-config-recommended');
  opts.rules = {
    'at-rule-no-unknown': null,
    'declaration-block-trailing-semicolon': 'always',
    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['global']
    }],
    'rule-empty-line-before': ['always', {
      except: ['after-single-line-comment', 'first-nested']
    }]
  };
  opts.fix = true;

  _stylelint.default.lint({
    config: opts,
    files,
    formatter: 'verbose'
  }).then(res => {
    if (res.errored) {
      console.log(res.output); // 在普通命令模式会打印两次 exit

      process.exit(1);
    }
  });
}