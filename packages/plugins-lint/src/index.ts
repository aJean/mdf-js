import { IApi } from '@mdfjs/types';
import { errorPrint } from '@mdfjs/utils';
import eslint from './eslint';
import stylelint from './stylelint';

/**
 * @file styleLint、esLint、prettier
 * @todo 支持 vue
 */

export default function(api: IApi) {
  api.registerCommand({
    name: 'lint',
    fn(args: any) {
      const opts = require('stylelint-config-standard');
      const files = args.files;

      if (args.es) {
        eslint(files, api.cwd);
      } else if (args.css || args.sass || args.less) {
        stylelint(files, opts);
      } else {
        errorPrint({ name: 'error', message: 'must pass a type parameter to mdflint' });
      }
    },
  });
}
