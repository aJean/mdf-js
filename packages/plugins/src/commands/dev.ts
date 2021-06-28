import { IApi } from '@mdfjs/types';
import Bundler from '@mdfjs/bundler-webpack';
import { startDevServer, startWorkServer, restartWorkServer } from '@mdfjs/server';
import { watch, chalkPrints, genAppPath, Spinner, rmrf } from '@mdfjs/utils';
import { resolve as resolvePath } from 'path';

/**
 * @file 本地开发，需要 watch
 */

export default function (api: IApi) {
  const { paths, PluginType } = api;

  // @test 修改用户配置
  api.changeUserConfig(function (config) {
    // config.devServer.port = 9999;
    return config;
  });

  api.registerCommand({
    name: 'dev',
    async fn() {
      const config = api.getConfig();
      const spinner = new Spinner({ text: 'generate mdf\n', graph: 'dots' }).start();

      rmrf(paths.absTmpPath);
      api.makeDir(paths.absTmpPath);

      await api.codeGenerate();
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

      // dev pipeline
      const { webpackCompiler, serverOpts } = bundler.setupDev();
      const { workServer } = config;
      const reqs = Promise.all([
        startDevServer(webpackCompiler, serverOpts),
        workServer ? startWorkServer(workServer) : null,
      ]);

      return reqs.then((res) => {
        const devRes: any = res[0];
        const workRes: any = res[1];
        // 必须加个延时，要在 webpack 之后输出
        setTimeout(function () {
          api.invokePlugin({ key: 'processDone', type: PluginType.flush });

          chalkPrints([[`\nsuccess: `, 'green'], ` mdf server`]);
          console.log(` - ${devRes.msg}`);
          workRes.msg && console.log(` - ${workRes.msg}`);

          initWatchers(api, devRes.server, !!workRes);
        }, 800);
      });
    },
  });
}

/**
 * 初始化监控
 */
function initWatchers(api: IApi, server: any, useProxy = false) {
  const unwatchs: any = [];

  unwatchs.push(
    watch({
      path: resolvePath('./config'),
      useMemo: true,
      exclude: /proxy.json/i,
      onChange: function (type: any, path: string) {
        chalkPrints([[`${type}: `, 'green'], ` ${path}`]);
        chalkPrints([[`restart: `, 'yellow'], ` dev-server`]);
        unwatchs.forEach((unwatch: Function) => unwatch());

        server.close();
        process.send!({ type: 'RESTART' });
      },
    }),
  );

  // 监听 app.ts
  unwatchs.push(
    watch({
      path: resolvePath(genAppPath(api)),
      onChange() {
        api.codeGenerate();
      },
    }),
  );

  if (useProxy) {
    // 读取 proxy 放在 work-server 内部处理
    unwatchs.push(
      watch({
        path: resolvePath('./config/proxy.json'),
        onChange() {
          process.stdout.write('\x1B[2J\x1B[3J\x1B[H');
          chalkPrints([[`restart: `, 'yellow'], ` work-server`]);
          restartWorkServer();
        },
      }),
    );
  }

  return unwatchs;
}
