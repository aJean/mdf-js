import Chain from 'webpack-chain';
import { ICommand, PluginType } from './types';
import Service from './service';
/**
 * @file api inject for plugins
 */
declare type DescribeData = {
    key: string;
    config: DescribeConfig;
};
declare type DescribeConfig = {
    schema: Function;
    default?: any;
};
export declare type ExportsType = {
    all?: boolean;
    specifiers?: string[];
    source: string;
};
export declare type CodePlugin = {
    name: string;
    fn?: Function;
    resolve?: Function;
    last?: Function;
};
export default class Api {
    service: Service;
    cwd: string;
    Mustache: any;
    PluginType: typeof PluginType;
    constructor(service: Service);
    /**
     * 获取用户配置，拿到的应该是经过 merge 和验证的结果
     */
    getConfig(): any;
    /**
     * 描述该插件的配置项语法
     * @tutorial 不要放到事件里去执行，否则在 getConfig 验证时候拿不到 schema
     */
    describe(data: DescribeData): void;
    /**
     * 快捷注册代码生成 hook
     */
    onCodeGenerate(plugin: CodePlugin): void;
    /**
     * 执行代码生成
     */
    codeGenerate(): any;
    /**
     * 运行时导出
     */
    addRuntimeExports(fn: () => ExportsType | null): void;
    /**
     * 注册可执行命令
     */
    registerCommand(command: ICommand): void;
    /**
     * 添加可以在运行时使用的插件 key
     */
    addRuntimePluginKey(keys: any): void;
    /**
     * 添加运行时插件
     */
    addRuntimePlugin(fn: Function): void;
    /**
     * 改变用户的原始配置
     */
    changeUserConfig(fn: (config: any) => Object): void;
    /**
     * 建议插件使用这个直接改 webpack config
     */
    chainWebpack(fn: (chain: Chain) => void): void;
    /**
     * 修改最终生成的 bundle config
     */
    changeBundleConfig(fn: (config: any) => Object): void;
    /**
     * 增加工程 polyfill 引入
     */
    addPolyfill(fn: () => string[]): void;
    /**
     * 工作进程退出时执行
     */
    onProcessExit(fn: () => void): void;
    /**
     * 初次构建完成后执行
     */
    addProcessDone(fn: () => void): void;
    /**
     * 注入入口文件引用模块
     */
    addImportsBehind(fn: () => void): void;
    /**
     * 监听 function
     */
    createWatchFn(): (opts: {
        api: Api;
        watchOpts: any;
        onExit?: Function;
    }) => void;
}
export {};
