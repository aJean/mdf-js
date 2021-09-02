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
        compiler: webpack.Compiler;
        devMiddleware: (webpackDevMiddleware.WebpackDevMiddleware & import("connect").NextHandleFunction) | undefined;
        opts: {
            port: any;
            host: any;
            compress: boolean;
            hot: boolean;
            static: {
                publicPath: any;
                directory: any;
                watch: boolean;
            };
            historyApiFallback: {
                index: string;
            };
            open: boolean;
            client: {
                logging: string;
                overlay: boolean;
                progress: boolean;
            };
            watchFiles: {
                options: {
                    ignored: RegExp;
                    interval: number;
                    binaryInterval: number;
                };
            };
            onBeforeSetupMiddleware(server: any): void;
            onAfterSetupMiddleware(server: any): void;
            devMiddleware: {
                stats: boolean;
            };
        };
    };
    print(data: Object): void;
}
export {};
