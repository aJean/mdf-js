import 'reflect-metadata';
import Api, { CodePlugin } from './api';
import * as Utils from './utils';
import { getConfig, getUserConfig } from './getConfig';
import { IConfig, IPaths, PluginType, PluginsOpts, ICommand } from './types';
import { rejects } from 'assert';

/**
 * @file core service
 * plugins、pluginConfigs 全部以 key value 形式存储
 */

export default class Service {
  config: IConfig | null = null;
  // 必须的路径
  paths: IPaths = Utils.getPaths();
  // 原始插件资产
  presets: object[];
  // init 后的插件资产
  plugins: { [key: string]: Array<Function> } = {};
  // define plugin config
  pluginConfigs: Object = {};
  // cli 命令
  commands: { [name: string]: ICommand } = {};
  // 运行时插件的 valid key
  runtimeKeys: string[] = [];

  constructor(presets: Array<string>) {
    // 没经过处理的 user config
    this.config = getUserConfig();
    this.presets = Utils.resolvePresets(presets);
  }

  /**
   * 为插件安装生成 api 注入
   */
  getApi() {
    const This = this;
    const api = new Api(This);

    return new Proxy(api, {
      get(target, prop: string) {
        let fn = This[prop];

        if (fn && fn.bind) {
          return fn.bind(This);
        } else if (Utils[prop]) {
          return Utils[prop];
        }

        switch (prop) {
          case 'PluginType':
            return PluginType;
          case 'paths':
            return This[prop];
          case 'runtimeKeys':
            return This[prop];
          case 'version':
            return This[prop];
        }

        return target[prop];
      },
    });
  }

  /**
   * 初始化插件集
   */
  initPresets() {
    const presets = this.presets;
    presets.forEach((preset) => this.initPreset(preset));
  }

  /**
   * 深度优先
   */
  initPreset(preset: any) {
    const api = this.getApi();
    const extraPresets: any = [];
    const result = preset.apply()(api);

    if (result && result.presets) {
      extraPresets.splice(0, 0, ...Utils.resolvePresets(result.presets));
    }

    while (extraPresets.length) {
      const preset = extraPresets.shift();
      this.initPreset(preset);
    }
  }

  /**
   * 注册新插件
   */
  registerPlugin(key: string, fn: any) {
    let list = this.plugins[key];

    if (!list) {
      list = this.plugins[key] = [];
    }

    list.push(fn);
  }

  /**
   * 执行内部插件
   * @param opts.initValue 无插件时的返回值，同时也作为 compose、modify 的参数
   * @param opts.args      add、event 的参数
   */
  invokePlugin(opts: PluginsOpts) {
    const { key, type, initValue, args = [] } = opts;
    const list = this.plugins[key];

    if (!list || !list.length) {
      return initValue;
    }

    switch (type) {
      // 要求 plugin fn 必须有返回值
      case PluginType.add:
        return Utils.deepArrayAdd(list, args, []);

      // 对 initValue 的修改，要求 plugin fn 必须有返回值
      case PluginType.modify:
        let value = initValue;

        for (let fn of list) {
          value = fn(value);
        }

        return value;

      // 避免用户写的太多，内部 wrap 一下
      case PluginType.compose:
        const wrapList = list.map((fn: Function) => {
          return (next: Function) => () => fn(next);
        });
        return wrapList.reduce((last: Function, current: Function) => current(last), initValue);

      case PluginType.event:
        list.forEach((fn: any) => Utils.runInContext(fn, args));
        return undefined;

      // generate code 专用
      case PluginType.code:
        const fns = list.filter((plugin: CodePlugin) => plugin.fn);
        const resolves: CodePlugin[] = list.filter((plugin: CodePlugin) => plugin.resolve);

        const next: any = function () {
          const plugin = resolves.shift();

          if (!plugin) {
            return Promise.resolve(null);
          }

          return new Promise(function (resolve, reject) {
            const ret = plugin.resolve!();

            if (ret && ret.then) {
              ret.then(() => resolve(null)).catch((e: Error) => reject(e));
            } else {
              resolve(null);
            }
          })
            .then(() => next())
            .catch((e) => {
              throw new Error(`[plugin ${plugin.name}] ${e.message}`);
            });
        };

        fns.forEach((plugin: any) => {
          try {
            Utils.runInContext(plugin.fn, args);
          } catch (e) {
            throw new Error(`[plugin ${plugin.name}] ${e.message}`);
          }
        });

        return next();

      // 清除信息
      case PluginType.flush:
        while (list.length) {
          const fn = list.shift()!;
          Utils.runInContext(fn, args);
        }
        return undefined;
    }
  }

  /**
   * 执行 cli 命令
   */
  async runCommand(name: string, data = {}) {
    try {
      this.initPresets();
      this.invokePlugin({ key: 'onStart', type: PluginType.event, args: [data] });

      // 收集 config 目录里面的配置并验证
      this.config = getConfig(this);
      await this.commands[name].fn(data);
    } catch (e) {
      Utils.chalkPrint(`run command-${name} failed`, 'red');
      console.log(Utils.parseError(e.message));
      process.exit(0);
    }
  }
}

// 因为绝大部分异常都是跟 invokePlugin 相关的，所以放到这处理
process.on('unhandledRejection', (e) => {
  console.log(e);
  process.exit(0);
});

// 定义插件策略
Reflect.defineMetadata('PluginsType', PluginType, Service);
