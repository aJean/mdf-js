"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDevServerOpts;

var _child_process = require("child_process");

var _path = require("path");

var _open = _interopRequireDefault(require("open"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file 配置 webpack dev server
 */
function getDevServerOpts(opts = {}) {
  const publicPath = opts.publicPath,
        devServer = opts.devServer;

  const _ref = devServer || {},
        _ref$port = _ref.port,
        port = _ref$port === void 0 ? 3000 : _ref$port,
        _ref$host = _ref.host,
        host = _ref$host === void 0 ? 'localhost' : _ref$host;

  return {
    port,
    host,
    contentBase: opts.contentBase || (0, _path.resolve)('./public'),
    watchContentBase: true,
    publicPath,
    compress: true,
    clientLogLevel: 'warning',
    disableHostCheck: true,
    open: false,
    hot: true,
    hotOnly: false,
    historyApiFallback: {
      index: `${publicPath}/index.html`
    },
    openPage: publicPath,
    overlay: {
      warnings: false,
      errors: true
    },
    stats: {
      errors: true,
      warnings: true,
      colors: true,
      all: false
    },

    before(app, server, compiler) {
      // 防止响应 html 模板导致控制台报错
      if (/[a-z]/i.test(publicPath)) {
        app.get('/', function (req, res) {
          res.redirect(publicPath);
        });
      }

      compiler.hooks.watchRun.tap('CleanConsolePlugin', () => {
        try {
          console.clear();
          process.stdout.write('\x1Bc');
        } catch (e) {//
        }
      });
    },

    after() {
      const url = `http://${host}:${port}`;
      const supportedChromiumBrowsers = ['Google Chrome Canary', 'Google Chrome', 'Microsoft Edge', 'Brave Browser', 'Vivaldi', 'Chromium'];

      for (var _i = 0, _supportedChromiumBro = supportedChromiumBrowsers; _i < _supportedChromiumBro.length; _i++) {
        let chromiumBrowser = _supportedChromiumBro[_i];

        try {
          // mac 上可以通过 osascript 进行tab复用
          (0, _child_process.execSync)('ps cax | grep "' + chromiumBrowser + '"');
          (0, _child_process.execSync)('osascript openChrome.applescript "' + encodeURI(url) + '" "' + chromiumBrowser + '"', {
            cwd: __dirname,
            stdio: 'ignore'
          });
          return;
        } catch (err) {}
      } // 如果复用 tab 失败， 打开新标签页


      (0, _open.default)(url).catch(() => {});
    }

  };
}