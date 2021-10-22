/**
 * @file 配置 webpack dev server 4.0
 */
export default function (opts?: any): {
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
        rewrites: any;
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
