import WebpackDevServer from 'webpack-dev-server';
import { Compiler } from 'webpack';

/**
 * @file 封装 webpack-dev-server
 */

export interface IServerOpts {
  webpackCompiler: Compiler;
  serverOpts: any;
  onError?: Function;
  onListening?: Function;
  onFinish?: (...args: any) => void;
}

export default class DevServer {
  // @ts-ignore
  opts: IServerOpts;
  httpServer: any;
  host = '0.0.0.0';

  constructor(opts: IServerOpts) {
    this.createOpts(opts);
    this.createServer();
  }

  createOpts(opts: IServerOpts) {
    const { serverOpts = {} } = opts;

    if (!serverOpts.port) {
      serverOpts.port = 3000;
    }

    if (serverOpts.host && serverOpts.host !== 'localhost') {
      this.host = serverOpts.host;
    }

    this.opts = opts;
  }

  createServer() {
    const { webpackCompiler, serverOpts, onFinish } = this.opts;
    const internalIp = require('internal-ip');

    let timeId: any;
    // 会执行两次，可能是 dev-server 影响的还不知道原因
    webpackCompiler.hooks.done.tap('devDone', function (stats: any) {
      if (stats.hasErrors()) {
        console.log(stats.toString('errors-only'));
        // process.exit(1); 不中断进程比较好，否则会影响开发体验
      }

      if (onFinish) {
        clearTimeout(timeId);
        timeId = setTimeout(function () {
          console.log(`app is runing at ${internalIp.v4.sync()}:${serverOpts.port}`);
          onFinish();
        }, 500);
      }
    });

    // @ts-ignore
    this.httpServer = new WebpackDevServer(webpackCompiler, serverOpts);
  }

  start() {
    const { serverOpts, onError, onListening } = this.opts;

    this.httpServer.listen(serverOpts.port, this.host, (err: any) => {
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
