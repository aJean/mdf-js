/**
 * @file mdf browser 插件
 */

export enum PluginType {
  add = 'add',
  modify = 'modify',
  event = 'event',
  compose = 'compose',
}

interface IPlugin {
  path?: string;
  exports: object;
}

interface IOpts {
  validKeys?: string[];
}

interface IPluginOpts {
  key: string;
  type: PluginType;
  initValue?: any;
  args?: object;
  async?: boolean;
}

export class Plugin {
  validKeys: string[];
  hooks: { [key: string]: any };

  constructor(opts: IOpts) {
    this.validKeys = opts.validKeys || [];
    this.hooks = {};
  }

  /**
   * 通过 exports 注册运行时插件，调用一般是由框架自动生成的
   */
  register(plugin: IPlugin) {
    Object.keys(plugin.exports).forEach((key) => {
      let list = this.hooks[key];

      if (!list) {
        list = this.hooks[key] = [];
      }
      // 导出的属性必须是注册过的 key
      // this.validKeys.indexOf(key) > -1
      this.hooks[key] = list.concat(plugin.exports[key]);
    });
  }

  /**
   * 对开发者更友好的注册方式
   */
  registerPlugin(opts: any) {
    Object.keys(opts).forEach((key) => {
      let list = this.hooks[key];

      if (!list) {
        list = this.hooks[key] = [];
      }

      this.hooks[key] = list.concat(opts[key]);
    });
  }

  /**
   * 执行插件
   */
  invoke(data: IPluginOpts) {
    const { key, type, initValue, args } = data;
    const hooks = this.hooks[key];

    if (!hooks || !hooks.length) {
      return initValue;
    }

    switch (type) {
      case PluginType.add:
        const ret: any = [];
        hooks.forEach((hook: Function) => ret.push(hook(args)));
        return ret;

      case PluginType.modify:
        let value = initValue;

        for (let hook of hooks) {
          value = hook(value);
        }

        return value;
      
      // 避免用户写的太多，内部 wrap 一下
      case PluginType.compose:
        const wrapHooks = hooks.map((fn: Function) => {
          return (next: Function) => () => fn(next);
        });
        return wrapHooks.reduce((last: Function, current: Function) => current(last), initValue);

      // @todo 支持异步
      case PluginType.event:
        return hooks.forEach((hook: Function) => hook.apply(null, args));
    }
  }
}
