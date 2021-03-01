/**
 * @file babel-js 的默认配置，不同框架的 bundler 可以覆盖
 */
export default function getBabelOpts(opts: any): {
    cacheDirectory: boolean;
    presets: any[][];
    plugins: ((string | {
        version: any;
        absoluteRuntime: string;
        useESModules: boolean;
    })[] | (string | {
        legacy: boolean;
    })[] | (string | {
        loose: boolean;
    })[])[];
};
