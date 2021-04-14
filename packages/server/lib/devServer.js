"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DevServer {
  constructor(opts) {
    this.opts = opts;
    this.createServer();
  }

  createServer() {
    const _this$opts = this.opts,
          webpackCompiler = _this$opts.webpackCompiler,
          serverOpts = _this$opts.serverOpts,
          onFinish = _this$opts.onFinish;
    let timeId; // 会执行两次，可能是 dev-server 影响的还不知道原因

    webpackCompiler.hooks.done.tap('devDone', function (stats) {
      if (stats.hasErrors()) {
        console.log(stats.toString('errors-only')); // process.exit(1); 不中断进程比较好，否则会影响开发体验
      }

      if (onFinish) {
        clearTimeout(timeId);
        timeId = setTimeout(onFinish, 1000);
      }
    }); // @ts-ignore

    this.httpServer = new _webpackDevServer.default(webpackCompiler, serverOpts);
  }

  start() {
    const _this$opts2 = this.opts,
          _this$opts2$serverOpt = _this$opts2.serverOpts,
          serverOpts = _this$opts2$serverOpt === void 0 ? {} : _this$opts2$serverOpt,
          onError = _this$opts2.onError,
          onListening = _this$opts2.onListening;
    const _serverOpts$port = serverOpts.port,
          port = _serverOpts$port === void 0 ? '8000' : _serverOpts$port,
          _serverOpts$host = serverOpts.host,
          host = _serverOpts$host === void 0 ? '0.0.0.0' : _serverOpts$host;
    this.httpServer.listen(port, host, err => {
      if (err) {
        onError ? onError(err) : console.log(err);
      } else {
        onListening && onListening();
      }
    });
  }

  close() {
    this.httpServer.close();
  }

}

exports.default = DevServer;