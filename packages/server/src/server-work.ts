import express, { NextFunction, Request, Response } from 'express';
import { createProxyMiddleware, Options as ProxyOpts } from 'http-proxy-middleware';
import http from 'http';
import url from 'url';
import { loadUserProxy, getYapiToken, getCorsHeaders } from './utils';

/**
 * @file 这个模块将会聚合以下功能：proxy、ws 通信、ui 原子交互
 */

export interface WorkOpts {
  port?: number;
  proxy?: any;
  ws?: boolean;
  ui?: boolean;
  onError?: Function;
  onListening?: Function;
  onFinish?: (...args: any) => void;
}

export class WorkServer {
  // @ts-ignore
  opts: WorkOpts;
  httpServer: any;
  app = express();

  constructor(opts: WorkOpts) {
    this.createOpts(opts);
    this.createServer();
  }

  createOpts(opts: WorkOpts) {
    if (!opts.port) {
      opts.port = 9000;
    }

    this.opts = opts;
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
      res.header('Access-Control-Allow-Headers', getCorsHeaders());
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
    const rootProxy = genProxyMiddleware(server);

    // TODO: context + bypass 模式, 动态创建对性能有损失
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const requestPath = req.path;
      const toPath = paths[requestPath];

      // 完整匹配
      if (toPath) {
        const exactProxy = genProxyMiddleware(requestPath, toPath);
        this.print(requestPath, toPath);
        return exactProxy ? exactProxy(req, res, next) : next();
      }

      // 正则匹配
      const proxyPaths = Object.keys(paths);
      for (let path of proxyPaths) {
        const address = paths[path];

        if (new RegExp(path, 'i').test(requestPath)) {
          const fuzzyProxy = genProxyMiddleware(address)!;
          this.print(requestPath, address);
          return fuzzyProxy(req, res, next);
        }
      }

      // 返回的数据结构还需要 parse function
      this.print(requestPath, server);
      return rootProxy ? rootProxy(req, res, next) : next();
    });
  }

  start() {
    const { onError, onListening, port } = this.opts;

    this.httpServer.listen(port, '0.0.0.0', 5, (err: any) => {
      if (err) {
        return onError ? onError(err) : console.log(err);
      }

      onListening && onListening();
    });
  }

  close() {
    this.httpServer.close();
  }

  print(from: string, to: string) {
    console.log(`[HPM] Proxy created: ${from}  -> ${to}`);
  }
}

/**
 * 根据路径映射生成 proxy route function
 */
function genProxyMiddleware(context: string, mapping?: string) {
  if (!mapping) {
    return createProxyMiddleware(genProxyOpts({ target: context, logLevel: 'info' }));
  }

  const data = url.parse(mapping);

  if (data.host) {
    const path = `${data.pathname}${data.search || ''}`;
    const target = `${data.protocol}//${data.host}`;

    return createProxyMiddleware(
      context,
      genProxyOpts({
        target,
        pathRewrite: { [context]: path },
        onProxyReq(proxyReq) {
          // 针对 yapi 的接口设置 cookie
          proxyReq.setHeader('cookie', getYapiToken());
        },
      }),
    );
  }

  return null;
}

/**
 * 生成 proxy opts
 */
function genProxyOpts(opts: ProxyOpts): ProxyOpts {
  return Object.assign(
    {
      changeOrigin: true,
      secure: false,
      logLevel: 'warn',

      onError(err, req, res) {
        console.log(err.message);
        res.end('Something went wrong. Please contact qy to resolve!');
      },
    } as ProxyOpts,
    opts,
  );
}

let workServer: WorkServer;
let serverOpts: WorkOpts;
/**
 * 首次创建服务传入外部参数使用这个方法
 */
export function startWorkServer(opts: WorkOpts = {}, callback?: Function) {
  return new Promise(function (resolve, reject) {
    Object.assign(opts, {
      onListening() {
        resolve({ server: workServer, msg: `work-server is running at localhost:${opts.port}` });
      },

      onError(err: any) {
        reject(err);
      },
    });

    workServer = new WorkServer((serverOpts = opts));
    workServer.start();
  });
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
