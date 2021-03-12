import { IApi } from '@mdfjs/types';
import Bundler from '@mdfjs/bundler-webpack';
import { DevServer, startWorkServer, restartWorkServer } from '@mdfjs/server';
import { watch, chalkPrints, genAppPath, Spinner } from '@mdfjs/utils';
import { resolve as resolvePath } from 'path';

/**
 * @file 本地开发，需要 watch
 */

export default function (api: IApi) {
  const { paths, PluginType } = api;

  // test: 修改用户配置
  api.changeUserConfig(function (config) {
    // config.devServer.port = 9999;
    return config;
  });

  api.registerCommand({
    name: 'dev',
    async fn() {
      const config = api.getConfig();
      const spinner = new Spinner({ text: 'generate mdf\n', spinner: 'dots' }).start();

      api.makeDir(paths.absTmpPath);
      await generateCode(api);

      spinner.succeed({ text: 'generate success', color: 'yellow' });

      // instance
      config!.isDev = true;
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

      api.invokePlugin({
        key: 'onBuildComplete',
        type: PluginType.event,
      });

      // dev pipeline
      const { webpackCompiler, serverOpts } = bundler.setupDev();
      const server = new DevServer({
        webpackCompiler,
        serverOpts,
        onFinish() {
          api.invokePlugin({
            key: 'processDone',
            type: PluginType.flush,
          });

          // workServer 只配置开关，读取 proxy 放在 server 内部处理
          if (config.workServer) {
            startWorkServer(config.workServer, function () {
              const unwatchProxy = watch({
                path: resolvePath('./config/proxy.json'),
                onChange: function () {
                  chalkPrints([[`restart: `, 'yellow'], ` workserver`]);
                  restartWorkServer();
                },
              });

              unwatchs.push(unwatchProxy);
            });
          }
        },
      });

      server.start();

      // important watchs
      const unwatchs: any = [];
      const unwatchConfig = watch({
        path: resolvePath('./config'),
        useMemo: true,
        onChange: function (type: any, path: string) {
          // 代理服务会自己处理
          if (/proxy.json/.test(path)) {
            return;
          }

          chalkPrints([[`${type}: `, 'green'], ` ${path}`]);
          chalkPrints([[`restart: `, 'yellow'], ` mdf server`]);
          unwatchs.forEach((unwatch: Function) => unwatch());

          server.close();
          process.send!({ type: 'RESTART' });
        },
      });

      // 变化比较快，没必要提示了
      const unwatchApp = watch({
        path: resolvePath(genAppPath(api)),
        onChange: function () {
          generateCode(api);
        },
      });

      unwatchs.push(unwatchConfig, unwatchApp);
    },
  });
}

function generateCode(api: IApi): Promise<any> {
  return api.invokePlugin({ key: 'codeGenerate', type: api.PluginType.event });
}
