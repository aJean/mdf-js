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
export declare class DevServer {
    opts: DevOpts;
    httpServer: any;
    host: string;
    constructor(opts: DevOpts);
    createOpts(opts: DevOpts): void;
    createServer(): void;
    start(): void;
    close(): void;
}
/**
 * 服务启动 helper function
 */
export declare function startDevServer(webpackCompiler: Compiler, dev: any): Promise<unknown>;
