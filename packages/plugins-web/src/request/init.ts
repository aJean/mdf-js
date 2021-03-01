import { prettierFormat } from '@mdfjs/utils';
import { IApi } from '@mdfjs/types';
import { join } from 'path';

/**
 * @file web request api
 */

export default function(api: IApi) {
  api.onCodeGenerate(function() {
    const { Mustache, paths } = api;
    const config = api.getConfig();
    const tpl = api.getFile(join(__dirname, 'request.tpl'))!;
    const content = Mustache.render(tpl, {
      toolPath: require.resolve('@medlinker/apitool/request'),
      useProxy: checkProxy(config)
    });

    api.writeFile(`${paths.absTmpPath}/request.ts`, prettierFormat(content));
  });

  api.addRuntimePlugin(() => require.resolve('../plugins/request'));

  api.addRuntimeExports(function() {
    return {
      specifiers: ['request'],
      source: `./request`,
    };
  });
}

function checkProxy(config: any) {
  return Boolean(config.workServer && config.workServer.proxy);
}