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
    host: string;
    constructor(opts: IServerOpts);
    createOpts(opts: IServerOpts): void;
    createServer(): void;
    start(): void;
    close(): void;
}
