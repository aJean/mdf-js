import express, { RequestHandler } from 'express';
import http from 'http';
import routeMiddleware from './route';

/**
 * @file middle ware express server
 *       细节更可控，但要自己实现更多，比如使用 ws 来做 mdf-ui
 * @todo server router、html generator、more middlewares
 *       方案1 自主实现 hot client 与 dev server, 使用 sockjs 通信
 *       方案2 融合 webpack-hot-middleware 中间件、HotModuleReplacementPlugin
 * 
 */

export interface IServerOpts {
  devMiddleware: RequestHandler<any>;
  serverOpts: any;
  headers?: {
    [key: string]: string;
  };
  https?: any;
  http2?: any;
  onListening?: {
    ({
      port,
      host,
      httpServer,
      server,
    }: {
      port: number;
      host: string;
      httpServer: http.Server;
      server: Server;
    }): void;
  };
  onError?: Function;
}

export default class Server {
  app = express();
  opts: IServerOpts;
  httpServer: any;

  constructor(opts: IServerOpts) {
    this.opts = opts;
    this.setup();
    this.createServer();
  }

  setup() {
    const app = this.app;
    const devMiddleware = this.opts.devMiddleware;

    app.set('x-powered-by', false);
    app.use(routeMiddleware);
    app.use(devMiddleware);
  }

  createServer() {
    // const serverOpts = this.getServerModes();
    this.httpServer = http.createServer(this.app);
  }

  async start() {
    const { serverOpts = {}, onListening, onError } = this.opts;
    const { port = '8000', host = '0.0.0.0' } = serverOpts;
    const httpServer: http.Server = this.httpServer;

    return new Promise((resolve) => {
      httpServer.on('error', (e: any) => (onError ? onError(e) : console.log(e)));

      httpServer.listen(port, host, 5, () => {
        const ret = {
          port,
          host,
          httpServer,
          server: this,
        };

        onListening && onListening(ret);
        resolve(ret);
      });
    });
  }

  close() {
    this.httpServer.close();
  }

  private getServerModes() {
    return this.opts.https || this.opts.http2;
  }
}
