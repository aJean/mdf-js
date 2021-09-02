/**
 * @file 这个模块将会聚合以下功能：proxy、ws 通信、ui 原子交互
 */
export interface WorkOpts {
    compiler?: any;
    port?: number;
    proxy?: any;
    ws?: boolean;
    ui?: boolean;
    onError?: Function;
    onListening?: Function;
    onFinish?: (...args: any) => void;
}
export declare class WorkServer {
    opts: WorkOpts;
    server: any;
    logger: any;
    app: import("express-serve-static-core").Express;
    constructor(opts: WorkOpts);
    createOpts(opts: WorkOpts): void;
    createServer(): void;
    /**
     * 流程化添加插件级中间件
     */
    steps(): void;
    /**
     * 跨域中间件，可能需要支持 cookie
     */
    corsMiddleware(): void;
    /**
     * 代理服务中间件
     */
    proxyMiddleware(): void;
    start(): void;
    close(): void;
    /**
     * use webpack logger interface
     */
    print(from: string, to: string): void;
}
/**
 * 首次创建服务传入外部参数使用这个方法
 */
export declare function startWorkServer(compiler: any, opts: WorkOpts): Promise<unknown>;
/**
 * watch 变化重启服务使用这个方法
 */
export declare function restartWorkServer(): void;
