/**
 * @file 配置 webpack dev server
 */
export default function getDevServerOpts(opts?: any): {
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
