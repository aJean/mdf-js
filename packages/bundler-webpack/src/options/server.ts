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
      watch: false,
    },

    // for browser router
    historyApiFallback: {
      index: genIndex(publicPath),
    },

    open: false,

    client: {
      logging: 'info',
      overlay: true,
      progress: false,
    },

    watchFiles: {
      options: {
        ignored: /node_modules/,
        interval: 300,
        binaryInterval: 300,
      },
    },

    onBeforeSetupMiddleware(server: any) {
      const { app, compiler } = server;

      // 防止响应 html 模板导致控制台报错
      if (/[a-z]/i.test(publicPath)) {
        app.get('/', function (req: any, res: any) {
          res.redirect(publicPath);
        });
      }

      compiler.hooks.watchRun.tap('clean', () => process.stdout.write('\x1B[2J\x1B[3J\x1B[H'));
    },

    onAfterSetupMiddleware(server: any) {
      server.middleware.waitUntilValid(() => openBrowser(`http://${host}:${port}`));
    },

    devMiddleware: {
      stats: false,
    },
  };
}

function genIndex(path: string) {
  return `${path == '/' ? '' : path}/index.html`;
}
