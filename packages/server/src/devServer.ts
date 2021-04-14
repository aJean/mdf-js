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
  opts: IServerOpts;
  httpServer: any;

  constructor(opts: IServerOpts) {
    this.opts = opts;
    this.createServer();
  }

  createServer() {
    const { webpackCompiler, serverOpts, onFinish } = this.opts;
    let timeId: any;
    // 会执行两次，可能是 dev-server 影响的还不知道原因
    webpackCompiler.hooks.done.tap('devDone', function(stats: any) {
      if (stats.hasErrors()) {
        console.log(stats.toString('errors-only'));
        // process.exit(1); 不中断进程比较好，否则会影响开发体验
      }

      if (onFinish) {
        clearTimeout(timeId);
        timeId = setTimeout(onFinish, 1000);
      }
    });

    // @ts-ignore
    this.httpServer = new WebpackDevServer(webpackCompiler, serverOpts);
  }

  start() {
    const { serverOpts = {}, onError, onListening } = this.opts;
    const { port = '8000', host = '0.0.0.0' } = serverOpts;

    this.httpServer.listen(port, host, (err: any) => {
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
