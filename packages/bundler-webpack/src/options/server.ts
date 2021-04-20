import { resolve as resolvePath } from 'path';
import openBrowser from '../scripts/openBrowser';

/**
 * @file 配置 webpack dev server
 */

export default function getServerOpts(opts: any = {}) {
  const { publicPath, devServer } = opts;
  const { port = 3000, host = 'localhost' } = devServer || {};

  return {
    port,
    host,
    contentBase: opts.contentBase || resolvePath('./public'),
    watchContentBase: true,
    publicPath,
    compress: true,
    clientLogLevel: 'warning',
    disableHostCheck: true,
    open: false,
    hot: true,
    hotOnly: false,

    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
    },

    historyApiFallback: {
      index: `${publicPath}/index.html`,
    },

    openPage: publicPath,

    overlay: {
      warnings: false,
      errors: true,
    },

    stats: {
      errors: true,
      warnings: true,
      colors: true,
      all: false,
    },

    before(app: any, server: any, compiler: any) {
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

    after() {
      openBrowser(`http://${host}:${port}`);
    },
  };
}
