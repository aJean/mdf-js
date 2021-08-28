"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getServerOpts;

var _path = require("path");

var _openBrowser = _interopRequireDefault(require("../scripts/openBrowser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file 配置 webpack dev server 4.0
 */
function getServerOpts(opts = {}) {
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
    compress: true,
    hot: true,
    static: {
      publicPath,
      directory: opts.static || (0, _path.resolve)('./public'),
      watch: {
        ignored: /node_modules/,
        aggregateTimeout: 300
      }
    },
    historyApiFallback: {
      index: `${publicPath}/index.html`
    },
    open: false,
    client: {
      logging: 'warn',
      overlay: true
    },

    onBeforeSetupMiddleware(server) {
      const app = server.app,
            compiler = server.compiler; // 防止响应 html 模板导致控制台报错

      if (/[a-z]/i.test(publicPath)) {
        app.get('/', function (req, res) {
          res.redirect(publicPath);
        });
      }

      compiler.hooks.watchRun.tap('clean-console', () => process.stdout.write('\x1B[2J\x1B[3J\x1B[H'));
    },

    onAfterSetupMiddleware() {
      (0, _openBrowser.default)(`http://${host}:${port}`);
    }

  };
}