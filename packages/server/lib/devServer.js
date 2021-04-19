"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DevServer {
  constructor(opts) {
    this.host = '0.0.0.0';
    this.createOpts(opts);
    this.createServer();
  }

  createOpts(opts) {
    const _opts$serverOpts = opts.serverOpts,
          serverOpts = _opts$serverOpts === void 0 ? {} : _opts$serverOpts;

    if (!serverOpts.port) {
      serverOpts.port = 3000;
    }

    if (serverOpts.host && serverOpts.host !== 'localhost') {
      this.host = serverOpts.host;
    }

    this.opts = opts;
  }

  createServer() {
    const _this$opts = this.opts,
          webpackCompiler = _this$opts.webpackCompiler,
          serverOpts = _this$opts.serverOpts,
          onFinish = _this$opts.onFinish;

    const internalIp = require('internal-ip');

    let timeId; // 会执行两次，可能是 dev-server 影响的还不知道原因

    webpackCompiler.hooks.done.tap('devDone', function (stats) {
      if (stats.hasErrors()) {
        console.log(stats.toString('errors-only')); // process.exit(1); 不中断进程比较好，否则会影响开发体验
      }

      if (onFinish) {
        clearTimeout(timeId);
        timeId = setTimeout(function () {
          console.log(`app is runing at ${internalIp.v4.sync()}:${serverOpts.port}`);
          onFinish();
        }, 500);
      }
    }); // @ts-ignore

    this.httpServer = new _webpackDevServer.default(webpackCompiler, serverOpts);
  }

  start() {
    const _this$opts2 = this.opts,
          serverOpts = _this$opts2.serverOpts,
          onError = _this$opts2.onError,
          onListening = _this$opts2.onListening;
    this.httpServer.listen(serverOpts.port, this.host, err => {
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

exports.default = DevServer;