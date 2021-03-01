import { execSync } from 'child_process';
import { resolve as resolvePath } from 'path';
import open from 'open';

/**
 * @file 配置 webpack dev server
 */

export default function getDevServerOpts(opts: any = {}) {
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

      compiler.hooks.watchRun.tap('CleanConsolePlugin', () => {
        try {
          console.clear();
          process.stdout.write('\x1Bc');
        } catch (e) {
          //
        }
      });
    },

    after() {
      const url = `http://${host}:${port}`;
      const supportedChromiumBrowsers = [
        'Google Chrome Canary',
        'Google Chrome',
        'Microsoft Edge',
        'Brave Browser',
        'Vivaldi',
        'Chromium',
      ];

      for (let chromiumBrowser of supportedChromiumBrowsers) {
        try {
          // mac 上可以通过 osascript 进行tab复用
          execSync('ps cax | grep "' + chromiumBrowser + '"');
          execSync(
            'osascript openChrome.applescript "' + encodeURI(url) + '" "' + chromiumBrowser + '"',
            {
              cwd: __dirname,
              stdio: 'ignore',
            },
          );
          return;
        } catch (err) {}
      }

      // 如果复用 tab 失败， 打开新标签页
      open(url).catch(() => {});
    },
  };
}
