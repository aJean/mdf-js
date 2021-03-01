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

  api.onCodeGenerate(() => {
    const { Mustache, paths } = api;
    const tpl = api.getFile(join(__dirname, 'polyfill.tpl'));
    const config = api.getConfig();
    const content = Mustache.render(tpl, {
      modules: config.polyfill || null
    });

    api.writeFile(`${paths.absTmpPath}/polyfill.ts`, content);
  });
};
