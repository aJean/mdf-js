"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startWorkServer = startWorkServer;
exports.restartWorkServer = restartWorkServer;
exports.WorkServer = void 0;

var _express = _interopRequireDefault(require("express"));

var _httpProxyMiddleware = require("http-proxy-middleware");

var _http = _interopRequireDefault(require("http"));

var _url = _interopRequireDefault(require("url"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class WorkServer {
  // @ts-ignore
  constructor(opts) {
    this.opts = void 0;
    this.httpServer = void 0;
    this.app = (0, _express.default)();
    this.createOpts(opts);
    this.createServer();
  }

  createOpts(opts) {
    if (!opts.port) {
      opts.port = 9000;
    }

    this.opts = opts;
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
      res.header('Access-Control-Allow-Headers', (0, _utils.getCorsHeaders)());
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

    const rootProxy = genProxyMiddleware(server); // TODO: context + bypass 模式, 动态创建对性能有损失

    this.app.use((req, res, next) => {
      const requestPath = req.path;
      const toPath = paths[requestPath]; // 完整匹配

      if (toPath) {
        const exactProxy = genProxyMiddleware(requestPath, toPath);
        this.print(requestPath, toPath);
        return exactProxy ? exactProxy(req, res, next) : next();
      } // 正则匹配


      const proxyPaths = Object.keys(paths);

      for (var _i = 0, _proxyPaths = proxyPaths; _i < _proxyPaths.length; _i++) {
        let path = _proxyPaths[_i];
        const address = paths[path];

        if (new RegExp(path, 'i').test(requestPath)) {
          const fuzzyProxy = genProxyMiddleware(address);
          this.print(requestPath, address);
          return fuzzyProxy(req, res, next);
        }
      } // 返回的数据结构还需要 parse function


      this.print(requestPath, server);
      return rootProxy ? rootProxy(req, res, next) : next();
    });
  }

  start() {
    const _this$opts = this.opts,
          onError = _this$opts.onError,
          onListening = _this$opts.onListening,
          port = _this$opts.port;
    this.httpServer.listen(port, '0.0.0.0', 5, err => {
      if (err) {
        return onError ? onError(err) : console.log(err);
      }

      onListening && onListening();
    });
  }

  close() {
    this.httpServer.close();
  }

  print(from, to) {
    console.log(`[HPM] Proxy created: ${from}  -> ${to}`);
  }

}
/**
 * 根据路径映射生成 proxy route function
 */


exports.WorkServer = WorkServer;

function genProxyMiddleware(context, mapping) {
  if (!mapping) {
    return (0, _httpProxyMiddleware.createProxyMiddleware)(genProxyOpts({
      target: context,
      logLevel: 'info'
    }));
  }

  const data = _url.default.parse(mapping);

  if (data.host) {
    const path = `${data.pathname}${data.search || ''}`;
    const target = `${data.protocol}//${data.host}`;
    return (0, _httpProxyMiddleware.createProxyMiddleware)(context, genProxyOpts({
      target,
      pathRewrite: {
        [context]: path
      },

      onProxyReq(proxyReq) {
        // 针对 yapi 的接口设置 cookie
        proxyReq.setHeader('cookie', (0, _utils.getYapiToken)());
      }

    }));
  }

  return null;
}
/**
 * 生成 proxy opts
 */


function genProxyOpts(opts) {
  return Object.assign({
    changeOrigin: true,
    secure: false,
    logLevel: 'warn',

    onError(err, req, res) {
      console.log(err.message);
      res.end('Something went wrong. Please contact qy to resolve!');
    }

  }, opts);
}

let workServer;
let serverOpts;
/**
 * 首次创建服务传入外部参数使用这个方法
 */

function startWorkServer(opts = {}, callback) {
  return new Promise(function (resolve, reject) {
    Object.assign(opts, {
      onListening() {
        resolve({
          server: workServer,
          msg: `work-server is running at localhost:${opts.port}`
        });
      },

      onError(err) {
        reject(err);
      }

    });
    workServer = new WorkServer(serverOpts = opts);
    workServer.start();
  });
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