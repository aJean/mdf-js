import { prettierFormat } from '@mdfjs/utils';
import { IApi } from '@mdfjs/types';
import { join, dirname } from 'path';

/**
 * @file web request api
 */

export default function (api: IApi) {
  api.onCodeGenerate(function () {
    const { Mustache, paths } = api;
    const config = api.getConfig();
    const tpl = api.getFile(join(__dirname, 'http.tpl'))!;
    const content = Mustache.render(tpl, {
      axiosPath: require.resolve('axios'),
      useProxy: checkProxy(config),
    });

    api.writeFile(`${paths.absTmpPath}/request.ts`, prettierFormat(content));
  });

  api.addRuntimePlugin(() => require.resolve('../plugins/trace'));

  // 导出到 mdf 命名空间
  api.addRuntimeExports(function () {
    return {
      specifiers: ['http'],
      source: `./request`,
    };
  });
}

function checkProxy(config: any) {
  return Boolean(config.workServer && config.workServer.proxy);
}
