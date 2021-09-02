import WebpackDevServer from 'webpack-dev-server';
import { Compiler } from 'webpack';

/**
 * @file 封装 webpack-dev-server
 */

export interface DevOpts {
  compiler: Compiler;
  dev: any;
  onError?: Function;
  onListening?: Function;
  onFinish?: (...args: any) => void;
}

export class DevServer {
  // @ts-ignore
  opts: DevOpts;
  server: any;

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

    if (!dev.host || dev.host == 'localhost') {
      dev.host = '0.0.0.0';
    }

    this.opts = opts;
  }

  createServer() {
    const { compiler, dev, onFinish } = this.opts;
    // @ts-ignore
    this.server = new WebpackDevServer(dev, compiler);

    compiler.hooks.afterDone.tap('devDone', (stats: any) => {
      if (stats.hasErrors()) {
        console.log(stats.toString('errors-only'));
        // process.exit(1); 不中断进程比较好，否则会影响开发体验
      }

      this.server.middleware.waitUntilValid(() => onFinish && onFinish());
    });
  }

  start() {
    const { onError, onListening } = this.opts;
    this.server
      .start()
      .then(() => onListening && onListening())
      .catch((e: any) => (onError ? onError(e) : console.log(e)));
  }

  /**
   * 等待 middleware state = true
   */
  wait(callback: Function) {
    this.server.middleware.waitUntilValid(() => callback());
  }

  close() {
    this.server.close();
  }
}

/**
 * 服务启动 helper function
 */
export function startDevServer(compiler: Compiler, dev: any) {
  const internalIp = require('internal-ip');

  return new Promise(function (resolve, reject) {
    const server = new DevServer({
      compiler,
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
