"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startDevServer = startDevServer;
exports.DevServer = void 0;

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DevServer {
  // @ts-ignore
  constructor(opts) {
    this.opts = void 0;
    this.httpServer = void 0;
    this.host = '0.0.0.0';
    this.createOpts(opts);
    this.createServer();
  }

  createOpts(opts) {
    const dev = opts.dev;

    if (!dev) {
      throw new Error('dev-server is missing opts of dev');
    }

    if (!dev.port) {
      dev.port = 3000;
    }

    if (dev.host && dev.host !== 'localhost') {
      this.host = dev.host;
    }

    this.opts = opts;
  }

  createServer() {
    const _this$opts = this.opts,
          webpackCompiler = _this$opts.webpackCompiler,
          dev = _this$opts.dev,
          onFinish = _this$opts.onFinish; // 会执行两次，可能是 dev-server 影响的还不知道原因

    webpackCompiler.hooks.done.tap('devDone', function (stats) {
      if (stats.hasErrors()) {
        console.log(stats.toString('errors-only')); // process.exit(1); 不中断进程比较好，否则会影响开发体验
      }

      onFinish && onFinish();
    }); // @ts-ignore

    this.httpServer = new _webpackDevServer.default(webpackCompiler, dev);
  }

  start() {
    const _this$opts2 = this.opts,
          dev = _this$opts2.dev,
          onError = _this$opts2.onError,
          onListening = _this$opts2.onListening;
    this.httpServer.listen(dev.port, this.host, err => {
      if (err) {
        return onError ? onError(err) : console.log(err);
      }

      onListening && onListening();
    });
  }

  close() {
    this.httpServer.close();
  }

}
/**
 * 服务启动 helper function
 */


exports.DevServer = DevServer;

function startDevServer(webpackCompiler, dev) {
  const internalIp = require('internal-ip');

  return new Promise(function (resolve, reject) {
    const server = new DevServer({
      webpackCompiler,
      dev,

      onFinish() {
        resolve({
          server,
          msg: `dev-server is runing at ${internalIp.v4.sync()}:${dev.port}`
        });
      },

      onError(err) {
        reject(err);
      }

    });
    server.start();
  });
}