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
    constructor(opts: IServerOpts);
    createServer(): void;
    start(): void;
    close(): void;
}
