import joi from 'joi';
import Mustache from 'mustache';
import Chain from 'webpack-chain';
import { watch } from '@mdfjs/utils';
import { ICommand, PluginType } from './types';
import Service from './service';

/**
 * @file api inject for plugins
 */

type DescribeData = {
  key: string;
  config: DescribeConfig;
};

type DescribeConfig = {
  schema: Function;
  default?: any;
};

export type ExportsType = {
  all?: boolean;
  specifiers?: string[];
  source: string;
};

export default class Api {
  service: Service;
  cwd = process.cwd();
  Mustache: any = Mustache;
  PluginType = PluginType;

  constructor(service: Service) {
    this.service = service;
  }

  /**
   * 获取用户配置，拿到的应该是经过 merge 和验证的结果
   */
  getConfig(): any {
    return this.service.config;
  }

  /**
   * 描述该插件的配置项语法
   * @tutorial 不要放到事件里去执行，否则在 getConfig 验证时候拿不到 schema
   */
  describe(data: DescribeData) {
    const { key, config } = data;

    this.service.pluginConfigs[key] = {
      default: config.default,
      schema: config.schema(joi),
    };
  }

  /**
   * 快捷注册代码生成 hook
   */
  onCodeGenerate(fn: Function, async?: boolean) {
    const plugin = { async, fn };

    this.service.registerPlugin('codeGenerate', plugin);
  }

  /**
   * 运行时导出
   */
  addRuntimeExports(fn: () => ExportsType | null) {
    this.service.registerPlugin('addRuntimeExports', fn);
  }

  /**
   * 注册可执行命令
   */
  registerCommand(command: ICommand) {
    const { name } = command;
    this.service.commands[name] = command;
  }

  /**
   * 添加可以在运行时使用的插件 key
   */
  addRuntimePluginKey(keys: any) {
    const runtimeKeys = this.service.runtimeKeys;

    if (typeof keys === 'string') {
      runtimeKeys.push(keys);
    } else if (typeof keys === 'object') {
      this.service.runtimeKeys = runtimeKeys.concat(keys);
    }
  }

  /**
   * 添加运行时插件
   */
  addRuntimePlugin(fn: Function) {
    this.service.registerPlugin('addRuntimePlugin', fn);
  }

  /**
   * 改变用户的原始配置
   */
  changeUserConfig(fn: (config: any) => Object) {
    this.service.registerPlugin('userConfig', fn);
  }

  /**
   * 建议插件使用这个直接改 webpack config
   */
  chainWebpack(fn: (chain: Chain) => void) {
    this.service.registerPlugin('chainWebpack', fn);
  }

  /**
   * 修改最终生成的 bundle config
   */
  changeBundleConfig(fn: (config: any) => Object) {
    this.service.registerPlugin('bundleConfig', fn);
  }

  /**
   * 增加工程 polyfill 引入
   */
  addPolyfill(fn: () => string[]) {
    this.service.registerPlugin('importsPolyfill', fn);
  }

  /**
   * 工作进程退出时执行
   */
  onProcessExit(fn: () => void) {
    this.service.registerPlugin('processExit', fn);
  }

  /**
   * 初次构建完成后执行
   */
  addProcessDone(fn: () => void) {
    this.service.registerPlugin('processDone', fn);
  }

  /**
   * 注入入口文件引用模块
   */
  addImportsBehind(fn: () => void) {
    this.service.registerPlugin('importsBehind', fn);
  }

  /**
   * 监听 function
   */
  createWatchFn() {
    let unwatch: any;

    return function(opts: { api: Api; watchOpts: any; onExit?: Function }) {
      if (!unwatch) {
        const { watchOpts, api, onExit } = opts;
        unwatch = watch(watchOpts);

        api.onProcessExit(function() {
          onExit && onExit();
          unwatch();
        });
      }
    };
  }
}
