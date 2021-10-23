"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _utils = require("@mdfjs/utils");

var _path = require("path");

var _openBrowser = _interopRequireDefault(require("../scripts/openBrowser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file 配置 webpack dev server 4.0
 */
function _default(opts = {}) {
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
      watch: false
    },
    // for browser router
    historyApiFallback: {
      rewrites: genRewrites(opts)
    },
    open: false,
    client: {
      logging: 'info',
      overlay: true,
      progress: false
    },
    watchFiles: {
      options: {
        ignored: /node_modules/,
        interval: 300,
        binaryInterval: 300
      }
    },

    onBeforeSetupMiddleware(server) {
      const app = server.app,
            compiler = server.compiler; // 防止响应 html 模板导致控制台报错

      if (/[a-z]/i.test(publicPath)) {
        app.get('/', function (req, res) {
          res.redirect(publicPath);
        });
      } // clean terminal


      compiler.hooks.watchRun.tap('clean', () => process.stdout.write('\x1B[2J\x1B[3J\x1B[H'));
    },

    onAfterSetupMiddleware(server) {
      server.middleware.waitUntilValid(() => (0, _openBrowser.default)(`http://${host}:${port}`));
    },

    devMiddleware: {
      stats: false
    }
  };
}
/**
 * 多入口页面规则配置，默认都进 index.html
 */


function genRewrites(opts) {
  const publicPath = opts.publicPath,
        project = opts.project;
  const prefix = `${publicPath == '/' ? '' : publicPath}`;
  const rules = [];
  (0, _utils.fromMeta)(project.multi, meta => {
    const name = meta.NAME;

    if (name == 'index') {
      rules.push({
        from: /^\/$/,
        to: `${prefix}/index.html`
      });
    } else {
      rules.push({
        from: new RegExp(`^/${name}`),
        to: `${prefix}/${name}.html`
      });
    }
  });
  return rules;
}