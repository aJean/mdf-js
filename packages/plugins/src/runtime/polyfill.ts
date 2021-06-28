import { join } from 'path';
import { IApi, IJoi } from '@mdfjs/types';

/**
 * @file polyfill 配置
 */

export default function (api: IApi) {
  api.describe({
    key: 'polyfill',
    config: {
      schema(joi: IJoi) {
        return joi.array();
      },
    },
  });

  api.addPolyfill(() => ['./polyfill']);

  api.onCodeGenerate({
    name: 'genPolyfill',
    last() {
      const { Mustache, paths } = api;
      const { polyfill } = api.getConfig();
      const tpl = api.getFile(join(__dirname, 'polyfill.tpl'));
      const content = Mustache.render(tpl, { modules: polyfill || null });

      api.writeFile(`${paths.absTmpPath}/polyfill.ts`, content);
    },
  });
}
