/// <reference types="webpack-dev-server" />
/// <reference types="connect" />
import { IBundler } from '@mdfjs/core';
import webpack, { Configuration } from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
/**
 * @file 使用 webpack 构建
 */
declare type IOpts = {
    changeUserConfig: Function;
    changeWebpackConfig: Function;
    changeBundleConfig: Function;
};
export default class BundlerWebpack implements IBundler {
    config: Configuration;
    bundleImpl: typeof webpack;
    userConfig: any;
    constructor(userConfig: any);
    /**
     * 通过用户配置 + 插件配置，生成 webpack 配置
     */
    generateConfig(opts: IOpts): void;
    build(): Promise<unknown>;
    /**
     * 启动本地构建模式
     */
    setupDev(isComplex?: boolean): {
        webpackCompiler: webpack.Compiler;
        devMiddleware: (webpackDevMiddleware.WebpackDevMiddleware & import("connect").NextHandleFunction) | undefined;
        serverOpts: {
            port: any;
            host: any;
            contentBase: any;
            watchContentBase: boolean;
            publicPath: any;
            compress: boolean;
            clientLogLevel: string;
            disableHostCheck: boolean;
            open: boolean;
            hot: boolean;
            hotOnly: boolean;
            historyApiFallback: {
                index: string;
            };
            openPage: any;
            overlay: {
                warnings: boolean;
                errors: boolean;
            };
            stats: {
                errors: boolean;
                warnings: boolean;
                colors: boolean;
                all: boolean;
            };
            before(app: any, server: any, compiler: any): void;
            after(): void;
        };
    };
    print(data: Object): void;
}
export {};
