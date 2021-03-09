import webpack, { Configuration } from 'webpack';
/**
 * @file 理论上可以对接不同的打包工具
 */
export default interface IBundler {
    config: Configuration;
    userConfig: any;
    bundleImpl: typeof webpack;
    /**
     * 执行构建
     */
    build: () => void;
    /**
     * 执行 dev server
     */
    setupDev: () => void;
    /**
     * 通过用户配置 + 插件配置，生成 webpack 配置
     */
    generateConfig: (userConfig: any, opts: any) => void;
}
