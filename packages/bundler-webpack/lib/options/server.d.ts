/**
 * @file 配置 webpack dev server 4.0
 */
export default function getServerOpts(opts?: any): {
    port: any;
    host: any;
    compress: boolean;
    hot: boolean;
    static: {
        publicPath: any;
        directory: any;
        watch: {
            ignored: RegExp;
            aggregateTimeout: number;
        };
    };
    historyApiFallback: {
        index: string;
    };
    open: boolean;
    client: {
        logging: string;
        overlay: boolean;
    };
    onBeforeSetupMiddleware(server: any): void;
    onAfterSetupMiddleware(): void;
};
