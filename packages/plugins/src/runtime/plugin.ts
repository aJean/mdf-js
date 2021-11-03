import { IApi } from '@mdfjs/types';
import { join, dirname } from 'path';
import { prettierFormat } from '@mdfjs/utils';

/**
 * @file 运行时的插件处理
 */

export const _runtimePluginKeys = ['appElement', 'beforeRender', 'render', 'kernal', 'appOpts'];

export default function (api: IApi) {
  const { Mustache, paths } = api;

  api.addRuntimePluginKey(_runtimePluginKeys);
  api.addRuntimePlugin(() => require.resolve('./enhance'));

  // 需要在 code-gen 队列中最后执行，否则插件的 runtimePlugin 都无法生效
  // TODO: api.fromMeta 多入口判断
  api.onCodeGenerate({
    name: 'genPlugin',
    resolve() {
      const tpl = api.getFile(join(__dirname, 'plugin.tpl'));
      const pluginConfig = getPluginConfig(api);
      const validKeys = api.runtimeKeys;
      const plugins = api.invokePlugin({
        key: 'addRuntimePlugin',
        type: api.PluginType.add,
      });

      const data: any = {
        validKeys,
        runtimePath: dirname(require.resolve('@mdfjs/runtime/package.json')),
        plugins: plugins,
        config: JSON.stringify(pluginConfig, null, 2),
      };

      const content = Mustache.render(tpl, data);
      api.writeFile(`${paths.absTmpPath}/plugins/plugin.ts`, prettierFormat(content));
    },
  });

  // 注意不要写在 codeGenerate 中否则 watch 会导致添加多次
  api.addRuntimeExports(function () {
    return {
      specifiers: ['plugin'],
      source: `./plugins/plugin`,
    };
  });
}

/**
 * 将 describe 过的插件配置导出到运行时
 */
function getPluginConfig(api: IApi) {
  const userConfig = api.getConfig();
  const pluginConfigs = api.service.pluginConfigs;
  const config = Object.create(null);

  Object.keys(pluginConfigs).forEach((key) => {
    config[key] = userConfig[key];
  });

  return config;
}
