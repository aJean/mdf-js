import { IApi } from '@mdfjs/types';
import Bundler from '@mdfjs/bundler-webpack';
import { Spinner, rmrf } from '@mdfjs/utils';

/**
 * @file 构建 prod
 */

export default function (api: IApi) {
  const { paths, PluginType } = api;

  api.registerCommand({
    name: 'build',
    async fn() {
      const config = api.getConfig();
      const spinner = new Spinner({ text: 'generate mdf\n', graph: 'dots' }).start();

      rmrf('dist');
      api.makeDir(paths.absTmpPath);

      await api.codeGenerate();
      spinner.succeed({ text: 'generate success', color: 'yellow' });

      // instance
      const bundler = new Bundler(config);

      bundler.generateConfig({
        changeUserConfig(userConfig: any) {
          return api.invokePlugin({
            type: PluginType.modify,
            key: 'userConfig',
            initValue: userConfig,
          });
        },

        changeWebpackConfig(chain: any) {
          return api.invokePlugin({
            type: PluginType.event,
            key: 'chainWebpack',
            args: [chain],
          });
        },

        changeBundleConfig(bundleConfig: any) {
          return api.invokePlugin({
            type: PluginType.modify,
            key: 'bundleConfig',
            initValue: bundleConfig,
          });
        },
      });

      return bundler
        .build()
        .catch((e: any) => console.log(e))
        .finally(() => {
          api.invokePlugin({ key: 'processDone', type: PluginType.flush });
          process.exit(0);
        });
    },
  });
}
