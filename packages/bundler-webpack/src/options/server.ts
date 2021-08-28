import { resolve as resolvePath } from 'path';
import openBrowser from '../scripts/openBrowser';

/**
 * @file 配置 webpack dev server 4.0
 */

export default function getServerOpts(opts: any = {}) {
  const { publicPath, devServer } = opts;
  const { port = 3000, host = 'localhost' } = devServer || {};

  return {
    port,
    host,
    compress: true,
    hot: true,

    static: {
      publicPath,
      directory: opts.static || resolvePath('./public'),
      watch: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
      },
    },

    historyApiFallback: {
      index: `${publicPath}/index.html`,
    },

    open: false,

    client: {
      logging: 'warn',
      overlay: true,
    },

    onBeforeSetupMiddleware(server: any) {
      const { app, compiler } = server;

      // 防止响应 html 模板导致控制台报错
      if (/[a-z]/i.test(publicPath)) {
        app.get('/', function (req: any, res: any) {
          res.redirect(publicPath);
        });
      }

      compiler.hooks.watchRun.tap('clean-console', () =>
        process.stdout.write('\x1B[2J\x1B[3J\x1B[H'),
      );
    },

    onAfterSetupMiddleware() {
      openBrowser(`http://${host}:${port}`);
    },
  };
}
