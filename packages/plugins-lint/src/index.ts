import { IApi } from '@mdfjs/types';
import { errorPrint } from '@mdfjs/utils';
import eslint from './eslint';
import stylelint from './stylelint';

/**
 * @file styleLint、esLint、prettier
 * @todo 支持 vue
 */

type LintOpts = {
  files: string[];
  es?: boolean;
  scss?: boolean;
  less?: boolean;
  css?: boolean;
};

export default function (api: IApi) {
  api.registerCommand({
    name: 'lint',
    fn(opts: LintOpts) {
      const config = require('stylelint-config-standard');
      const files = opts.files;
    

      if (opts.es) {
        eslint(api, files);
      } else if (opts.css || opts.scss || opts.less) {
        stylelint(files, config);
      } else {
        errorPrint({ name: 'error', message: 'must pass a type parameter to mdf-lint' });
      }
    },
  });
}
