/// <reference types="node" />
import { RequestHandler } from 'express';
import http from 'http';
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
        ({ port, host, httpServer, server, }: {
            port: number;
            host: string;
            httpServer: http.Server;
            server: Server;
        }): void;
    };
    onError?: Function;
}
export default class Server {
    app: import("express-serve-static-core").Express;
    opts: IServerOpts;
    httpServer: any;
    constructor(opts: IServerOpts);
    setup(): void;
    createServer(): void;
    start(): Promise<unknown>;
    close(): void;
    private getServerModes;
}
