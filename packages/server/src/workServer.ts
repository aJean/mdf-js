import express, { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware, Options as ProxyOptions } from 'http-proxy-middleware';
import http from 'http';
import url from 'url';
import { loadUserProxy, getYapiToken } from './utils';

/**
 * @file 这个模块将会聚合以下功能：proxy、ws 通信、ui 原子交互
 */

export interface IServerOpts {
  port?: number;
  proxy?: any;
  ws?: boolean;
  ui?: boolean;
  onError?: Function;
  onListening?: Function;
  onFinish?: (...args: any) => void;
}

class WorkServer {
  app = express();
  opts: IServerOpts;
  httpServer: any;

  constructor(opts: IServerOpts) {
    this.opts = opts;
    this.createServer();
  }

  createServer() {
    this.middlewareSteps();
    this.httpServer = http.createServer(this.app);
  }

  /**
   * 流程化添加插件级中间件
   */
  middlewareSteps() {
    const opts = this.opts;

    this.corsMiddleware();

    if (opts.proxy) {
      this.proxyMiddleware();
    }
    // this.wsMiddleware();
    // this.uiMiddleware();
  }

  /**
   * 跨域中间件，可能需要支持 cookie
   */
  corsMiddleware() {
    const app = this.app;

    app.set('x-powered-by', false);
    app.use(function (req: Request, res: Response, next: NextFunction) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header(
        'Access-Control-Allow-Headers',
        'X-Requested-With,Content-Type,Accept,X-Mdf-Proxy,X-Trace-Id',
      );
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
    const { server, paths } = loadUserProxy();

    const proxyMiddleware = genProxyMiddleware(server);
    // context + bypass 模式
    this.app.use(function (req: Request, res: Response, next: NextFunction) {
      const requestPath = req.path;

      // 完整匹配
      if (paths[requestPath]) {
        const exactProxy = genProxyMiddleware(requestPath, paths[requestPath]);
        return exactProxy ? exactProxy(req, res, next) : next();
      }

      // 正则匹配
      const proxyPaths = Object.keys(paths);
      for (let path of proxyPaths) {
        const address = paths[path];

        if (new RegExp(path, 'i').test(requestPath)) {
          const fuzzyProxy = genProxyMiddleware(address)!;
          return fuzzyProxy(req, res, next);
        }
      }

      // 返回的数据结构还需要 parse function
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
function genProxyMiddleware(...args: any) {
  if (args.length < 2) {
    const server = args[0];
    return server ? createProxyMiddleware(genProxyConfig({ target: server })) : null;
  }

  const context = args[0];
  const data = url.parse(args[1]);

  if (data.host) {
    const path = `${data.pathname}${data.search || ''}`;
    const target = `${data.protocol}//${data.host}`;

    return createProxyMiddleware(
      context,
      genProxyConfig({
        target,
        pathRewrite: { [context]: path },
        // 针对 yapi 的接口设置 cookie
        onProxyReq(proxyReq) {
          proxyReq.setHeader('cookie', getYapiToken());
        },
      }),
    );
  }

  return null;
}

/**
 * 生成 proxy config
 */
function genProxyConfig(config: ProxyOptions): ProxyOptions {
  const defaultConfig: ProxyOptions = {
    changeOrigin: true,
    secure: false,

    onError(err, req, res) {
      console.log(err.message);
      res.end('Something went wrong. Please contact qy to resolve!');
    },
  };

  return Object.assign(defaultConfig, config);
}

let workServer: WorkServer;
let serverOpts: IServerOpts;
/**
 * 首次创建服务传入外部参数使用这个方法
 */
export function startWorkServer(opts: IServerOpts = {}, callback?: Function) {
  // 因为使用了 hooks.done，要避免 compile 过程执行多次
  if (!workServer) {
    workServer = new WorkServer((serverOpts = opts));
    workServer.start();
    callback && callback();
  }
}

/**
 * watch 变化重启服务使用这个方法
 */
export function restartWorkServer() {
  if (workServer) {
    workServer.close();
  }

  // serverOpts 不会在 proxy.json 修改时变化，config 变化会直接重启整个进程
  workServer = new WorkServer(serverOpts);
  workServer.start();
}
