"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _mustache = _interopRequireDefault(require("mustache"));

var _utils = require("@mdfjs/utils");

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Api {
  constructor(service) {
    this.service = void 0;
    this.cwd = process.cwd();
    this.Mustache = _mustache.default;
    this.PluginType = _types.PluginType;
    this.service = service;
  }
  /**
   * 获取用户配置，拿到的应该是经过 merge 和验证的结果
   */


  getConfig() {
    return this.service.config;
  }
  /**
   * 迭代 meta 数据
   */


  fromMeta(callback) {
    const config = this.service.config;
    (0, _utils.fromMeta)(config.project.multi, callback);
  }
  /**
   * 描述该插件的配置项语法
   * @tutorial 不要放到事件里去执行，否则在 getConfig 验证时候拿不到 schema
   */


  describe(data) {
    const key = data.key,
          config = data.config;
    this.service.pluginConfigs[key] = {
      default: config.default,
      schema: config.schema(_joi.default)
    };
  }
  /**
   * 快捷注册代码生成 hook
   */


  onCodeGenerate(plugin) {
    this.service.registerPlugin('codeGenerate', plugin);
  }
  /**
   * 执行代码生成
   */


  codeGenerate() {
    return this.service.invokePlugin({
      key: 'codeGenerate',
      type: _types.PluginType.code
    });
  }
  /**
   * 运行时导出
   */


  addRuntimeExports(fn) {
    this.service.registerPlugin('addRuntimeExports', fn);
  }
  /**
   * 注册可执行命令
   */


  registerCommand(command) {
    const name = command.name;
    this.service.commands[name] = command;
  }
  /**
   * 添加可以在运行时使用的插件 key
   */


  addRuntimePluginKey(keys) {
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


  addRuntimePlugin(fn) {
    this.service.registerPlugin('addRuntimePlugin', fn);
  }
  /**
   * 改变用户的原始配置
   */


  changeUserConfig(fn) {
    this.service.registerPlugin('userConfig', fn);
  }
  /**
   * 建议插件使用这个直接改 webpack config
   */


  chainWebpack(fn) {
    this.service.registerPlugin('chainWebpack', fn);
  }
  /**
   * 修改最终生成的 bundle config
   */


  changeBundleConfig(fn) {
    this.service.registerPlugin('bundleConfig', fn);
  }
  /**
   * 增加工程 polyfill 引入
   */


  addPolyfill(fn) {
    this.service.registerPlugin('importsPolyfill', fn);
  }
  /**
   * 工作进程退出时执行
   */


  onProcessExit(fn) {
    this.service.registerPlugin('processExit', fn);
  }
  /**
   * 初次构建完成后执行
   */


  addProcessDone(fn) {
    this.service.registerPlugin('processDone', fn);
  }
  /**
   * 注入入口文件引用模块
   */


  addImportsBehind(fn) {
    this.service.registerPlugin('importsBehind', fn);
  }
  /**
   * 监听 function
   */


  createWatchFn() {
    let unwatch;
    return function (opts) {
      if (!unwatch) {
        const watchOpts = opts.watchOpts,
              api = opts.api,
              onExit = opts.onExit;
        unwatch = (0, _utils.watch)(watchOpts);
        api.onProcessExit(function () {
          onExit && onExit();
          unwatch();
        });
      }
    };
  }

}

exports.default = Api;