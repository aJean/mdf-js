import WebpackDevServer from 'webpack-dev-server';
import { Compiler } from 'webpack';

/**
 * @file 封装 webpack-dev-server
 */

export interface DevOpts {
  webpackCompiler: Compiler;
  dev: any;
  onError?: Function;
  onListening?: Function;
  onFinish?: (...args: any) => void;
}

export class DevServer {
  // @ts-ignore
  opts: DevOpts;
  httpServer: any;
  host = '0.0.0.0';

  constructor(opts: DevOpts) {
    this.createOpts(opts);
    this.createServer();
  }

  createOpts(opts: DevOpts) {
    const { dev } = opts;

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
    const { webpackCompiler, dev, onFinish } = this.opts;
    // 会执行两次，可能是 dev-server 影响的还不知道原因
    webpackCompiler.hooks.done.tap('devDone', function (stats: any) {
      if (stats.hasErrors()) {
        console.log(stats.toString('errors-only'));
        // process.exit(1); 不中断进程比较好，否则会影响开发体验
      }

      onFinish && onFinish();
    });

    // @ts-ignore
    this.httpServer = new WebpackDevServer(dev, webpackCompiler);
  }

  start() {
    const { dev, onError, onListening } = this.opts;

    this.httpServer.start(dev.port, this.host, (err: any) => {
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
export function startDevServer(webpackCompiler: Compiler, dev: any) {
  const internalIp = require('internal-ip');

  return new Promise(function (resolve, reject) {
    const server = new DevServer({
      webpackCompiler,
      dev,
      onFinish() {
        resolve({ server, msg: `dev-server is runing at ${internalIp.v4.sync()}:${dev.port}` });
      },
      onError(err: any) {
        reject(err);
      },
    });

    server.start();
  });
}
