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
export declare class DevServer {
    opts: DevOpts;
    server: any;
    constructor(opts: DevOpts);
    createOpts(opts: DevOpts): void;
    createServer(): void;
    start(): void;
    /**
     * 等待 middleware state = true
     */
    wait(callback: Function): void;
    /**
     * 关闭 dev server
     */
    close(): void;
}
/**
 * 服务启动 helper function
 */
export declare function startDevServer(compiler: Compiler, dev: any): Promise<unknown>;
