"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _route = _interopRequireDefault(require("./route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class Server {
  constructor(opts) {
    this.app = (0, _express.default)();
    this.opts = opts;
    this.setup();
    this.createServer();
  }

  setup() {
    const app = this.app;
    const devMiddleware = this.opts.devMiddleware;
    app.set('x-powered-by', false);
    app.use(_route.default);
    app.use(devMiddleware);
  }

  createServer() {
    // const serverOpts = this.getServerModes();
    this.httpServer = _http.default.createServer(this.app);
  }

  start() {
    var _this = this;

    return _asyncToGenerator(function* () {
      const _this$opts = _this.opts,
            _this$opts$serverOpts = _this$opts.serverOpts,
            serverOpts = _this$opts$serverOpts === void 0 ? {} : _this$opts$serverOpts,
            onListening = _this$opts.onListening,
            onError = _this$opts.onError;
      const _serverOpts$port = serverOpts.port,
            port = _serverOpts$port === void 0 ? '8000' : _serverOpts$port,
            _serverOpts$host = serverOpts.host,
            host = _serverOpts$host === void 0 ? '0.0.0.0' : _serverOpts$host;
      const httpServer = _this.httpServer;
      return new Promise(resolve => {
        httpServer.on('error', e => onError ? onError(e) : console.log(e));
        httpServer.listen(port, host, 5, () => {
          const ret = {
            port,
            host,
            httpServer,
            server: _this
          };
          onListening && onListening(ret);
          resolve(ret);
        });
      });
    })();
  }

  close() {
    this.httpServer.close();
  }

  getServerModes() {
    return this.opts.https || this.opts.http2;
  }

}

exports.default = Server;