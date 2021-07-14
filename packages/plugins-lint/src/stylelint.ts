import stylelint from 'stylelint';

/**
 * @file stylelint
 */

export default function (files: any, opts: any) {
  opts.extends = require.resolve('stylelint-config-recommended');
  opts.rules = {
    'at-rule-no-unknown': null,
    'declaration-block-trailing-semicolon': 'always',
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
    'rule-empty-line-before': ['always', { except: ['after-single-line-comment', 'first-nested'] }],
  };
  opts.fix = true;

  stylelint.lint({ config: opts, files, formatter: 'verbose' }).then((res) => {
    if (res.errored) {
      console.log(res.output);
      process.exit(1); // 为什么 exit 两次 ???!!
    }
  });
}
