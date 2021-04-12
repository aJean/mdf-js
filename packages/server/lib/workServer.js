"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startWorkServer = startWorkServer;
exports.restartWorkServer = restartWorkServer;

var _express = _interopRequireDefault(require("express"));

var _httpProxyMiddleware = require("http-proxy-middleware");

var _http = _interopRequireDefault(require("http"));

var _url = _interopRequireDefault(require("url"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WorkServer {
  constructor(opts) {
    this.app = (0, _express.default)();
    this.opts = opts;
    this.createServer();
  }

  createServer() {
    this.middlewareSteps();
    this.httpServer = _http.default.createServer(this.app);
  }
  /**
   * 流程化添加插件级中间件
   */


  middlewareSteps() {
    const opts = this.opts;
    this.corsMiddleware();

    if (opts.proxy) {
      this.proxyMiddleware();
    } // this.wsMiddleware();
    // this.uiMiddleware();

  }
  /**
   * 跨域中间件，可能需要支持 cookie
   */


  corsMiddleware() {
    const app = this.app;
    app.set('x-powered-by', false);
    app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept,X-Mdf-Proxy,X-Trace-Id');
      res.header('Access-Control-Allow-Credentials', 'true');

      if (req.method == 'OPTIONS') {
        res.sendStatus(200);
      } else {
        next();
      }
    });
  }
  /**
   * 代理服务中间件
   */


  proxyMiddleware() {
    // 每次安装都要重新读取 proxy 配置
    const _loadUserProxy = (0, _utils.loadUserProxy)(),
          server = _loadUserProxy.server,
          paths = _loadUserProxy.paths;

    const proxyMiddleware = genProxyMiddleware(server); // context + bypass 模式

    this.app.use(function (req, res, next) {
      const requestPath = req.path; // 完整匹配

      if (paths[requestPath]) {
        const exactProxy = genProxyMiddleware(requestPath, paths[requestPath]);
        return exactProxy ? exactProxy(req, res, next) : next();
      } // 正则匹配


      const proxyPaths = Object.keys(paths);

      for (var _i = 0, _proxyPaths = proxyPaths; _i < _proxyPaths.length; _i++) {
        let path = _proxyPaths[_i];
        const address = paths[path];

        if (new RegExp(path, 'i').test(requestPath)) {
          const fuzzyProxy = genProxyMiddleware(address);
          return fuzzyProxy(req, res, next);
        }
      } // 返回的数据结构还需要 parse function


      return proxyMiddleware ? proxyMiddleware(req, res, next) : next();
    });
  }

  start() {
    const port = this.opts.port || 9000;
    this.httpServer.listen(port, '0.0.0.0', 5, () => {
      console.log(`workserver is listening on localhost:${port}`);
    });
  }

  close() {
    this.httpServer.close();
  }

}
/**
 * 根据路径映射生成 proxy middleware
 */


function genProxyMiddleware(...args) {
  if (args.length < 2) {
    const server = args[0];
    return server ? (0, _httpProxyMiddleware.createProxyMiddleware)(genProxyConfig({
      target: server
    })) : null;
  }

  const context = args[0];

  const data = _url.default.parse(args[1]);

  if (data.host) {
    const path = `${data.pathname}${data.search || ''}`;
    const target = `${data.protocol}//${data.host}`;
    return (0, _httpProxyMiddleware.createProxyMiddleware)(context, genProxyConfig({
      target,
      pathRewrite: {
        [context]: path
      },

      // 针对 yapi 的接口设置 cookie
      onProxyReq(proxyReq) {
        proxyReq.setHeader('cookie', (0, _utils.getYapiToken)());
      }

    }));
  }

  return null;
}
/**
 * 生成 proxy config
 */


function genProxyConfig(config) {
  const defaultConfig = {
    changeOrigin: true,
    secure: false,

    onError(err, req, res) {
      console.log(err.message);
      res.end('Something went wrong. Please contact qy to resolve!');
    }

  };
  return Object.assign(defaultConfig, config);
}

let workServer;
let serverOpts;
/**
 * 首次创建服务传入外部参数使用这个方法
 */

function startWorkServer(opts = {}, callback) {
  // 因为使用了 hooks.done，要避免 compile 过程执行多次
  if (!workServer) {
    workServer = new WorkServer(serverOpts = opts);
    workServer.start();
    callback && callback();
  }
}
/**
 * watch 变化重启服务使用这个方法
 */


function restartWorkServer() {
  if (workServer) {
    workServer.close();
  } // serverOpts 不会在 proxy.json 修改时变化，config 变化会直接重启整个进程


  workServer = new WorkServer(serverOpts);
  workServer.start();
}