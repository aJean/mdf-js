import 'reflect-metadata';
import Api from './api';
import { IConfig, IPaths, PluginsOpts, ICommand } from './types';
/**
 * @file core service
 * plugins、pluginConfigs 全部以 key value 形式存储
 */
export default class Service {
    config: IConfig | null;
    paths: IPaths;
    presets: object[];
    plugins: {
        [key: string]: Array<Function>;
    };
    pluginConfigs: Object;
    commands: {
        [name: string]: ICommand;
    };
    runtimeKeys: string[];
    constructor(presets: Array<string>);
    /**
     * 为插件安装生成 api 注入
     */
    getApi(): Api;
    /**
     * 初始化插件集
     */
    initPresets(): void;
    /**
     * 深度优先
     */
    initPreset(preset: any): void;
    /**
     * 注册新插件
     */
    registerPlugin(key: string, fn: any): void;
    /**
     * 执行内部插件
     * @param opts.initValue 无插件时的返回值，同时也作为 compose、modify 的参数
     * @param opts.args      add、event 的参数
     */
    invokePlugin(opts: PluginsOpts): any;
    /**
     * 执行 cli 命令
     */
    runCommand(name: string, data?: {}): Promise<void>;
}
