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
    this.server = void 0;
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

    if (!dev.host || dev.host == 'localhost') {
      dev.host = '0.0.0.0';
    }

    this.opts = opts;
  }

  createServer() {
    const _this$opts = this.opts,
          compiler = _this$opts.compiler,
          dev = _this$opts.dev,
          onFinish = _this$opts.onFinish; // @ts-ignore

    this.server = new _webpackDevServer.default(dev, compiler);
    compiler.hooks.afterDone.tap('devDone', stats => {
      if (stats.hasErrors()) {
        console.log(stats.toString('errors-only')); // process.exit(1); 不中断进程比较好，否则会影响开发体验
      }

      this.server.middleware.waitUntilValid(() => onFinish && onFinish());
    });
  }

  start() {
    const _this$opts2 = this.opts,
          onError = _this$opts2.onError,
          onListening = _this$opts2.onListening;
    this.server.start().then(() => onListening && onListening()).catch(e => onError ? onError(e) : console.log(e));
  }
  /**
   * 等待 middleware state = true
   */


  wait(callback) {
    this.server.middleware.waitUntilValid(() => callback());
  }
  /**
   * 关闭 dev server
   */


  close() {
    // close method is deprecated in favor async stop or stopCallback
    this.server.stop();
  }

}
/**
 * 服务启动 helper function
 */


exports.DevServer = DevServer;

function startDevServer(compiler, dev) {
  const internalIp = require('internal-ip');

  return new Promise(function (resolve, reject) {
    const server = new DevServer({
      compiler,
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