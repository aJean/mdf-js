"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _api = _interopRequireDefault(require("./api"));

var Utils = _interopRequireWildcard(require("./utils"));

var _getConfig = require("./getConfig");

var _types = require("./types");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

/**
 * @file core service
 */

/**
 * 想让插件的管理简单些，暂时不做 skip 了，所以不需要 id 维度的聚合
 * plugins、pluginConfigs 全部以 key value 形式存储
 */
class Service {
  constructor(presets) {
    this.config = null; // 必须的路径

    this.paths = Utils.getPaths(); // init 后的插件资产

    this.plugins = {}; // define plugin config

    this.pluginConfigs = {}; // cli 命令

    this.commands = {}; // 运行时插件的 valid key

    this.runtimeKeys = []; // 没经过处理的 user config

    this.config = (0, _getConfig.getUserConfig)();
    this.presets = Utils.resolvePresets(presets);
  }
  /**
   * 为插件安装生成 api 注入
   */


  getApi() {
    const This = this;
    const api = new _api.default(This);
    return new Proxy(api, {
      get(target, prop) {
        let fn = This[prop];

        if (fn && fn.bind) {
          return fn.bind(This);
        } else if (Utils[prop]) {
          return Utils[prop];
        }

        switch (prop) {
          case 'PluginType':
            return _types.PluginType;

          case 'paths':
            return This[prop];

          case 'runtimeKeys':
            return This[prop];

          case 'version':
            return This[prop];
        }

        return target[prop];
      }

    });
  }
  /**
   * 初始化插件集
   */


  initPresets() {
    const presets = this.presets;
    presets.forEach(preset => this.initPreset(preset));
  }
  /**
   * 深度优先
   */


  initPreset(preset) {
    const api = this.getApi();
    const extraPresets = [];
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


  registerPlugin(key, fn) {
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


  invokePlugin(opts) {
    const key = opts.key,
          type = opts.type,
          initValue = opts.initValue,
          _opts$args = opts.args,
          args = _opts$args === void 0 ? [] : _opts$args;
    const list = this.plugins[key];

    if (!list || !list.length) {
      return initValue;
    }

    switch (type) {
      // 要求 plugin fn 必须有返回值
      case _types.PluginType.add:
        return Utils.deepArrayAdd(list, args, []);
      // 对 initValue 的修改，要求 plugin fn 必须有返回值

      case _types.PluginType.modify:
        let value = initValue;

        var _iterator = _createForOfIteratorHelper(list),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            let fn = _step.value;
            value = fn(value);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        return value;
      // 避免用户写的太多，内部 wrap 一下

      case _types.PluginType.compose:
        const wrapList = list.map(fn => {
          return next => () => fn(next);
        });
        return wrapList.reduce((last, current) => current(last), initValue);
      // 支持异步返回 promise

      case _types.PluginType.event:
        const asyncList = [];
        list.forEach(plugin => {
          if (plugin.async) {
            asyncList.push(plugin.fn);
          } else if (plugin.fn) {
            Utils.runInContext(plugin.fn, args);
          } else {
            Utils.runInContext(plugin, args);
          }
        });
        return Promise.resolve(true).then(() => {
          asyncList.forEach(fn => Utils.runInContext(fn, args));
        });
      // 清除信息

      case _types.PluginType.flush:
        while (list.length) {
          const fn = list.shift();
          Utils.runInContext(fn, args);
        }

        return undefined;
    }
  }
  /**
   * 执行构建命令
   */


  runCommand(name, data = {}) {
    try {
      this.initPresets();
      this.invokePlugin({
        key: 'onStart',
        type: _types.PluginType.event,
        args: [data]
      }); // 收集 config 目录里面的配置并验证

      this.config = (0, _getConfig.getConfig)(this);
      const command = this.commands[name];

      if (command) {
        command.fn(data);
      } else {
        Utils.chalkPrint(`command ${name} has not been registered`, 'red');
      }
    } catch (e) {
      Utils.chalkPrint(`can not run command ${name}`, 'red');
      console.log(e);
    }
  }

} // 因为绝大部分异常都是跟 invokePlugin 相关的，所以放到这处理


exports.default = Service;
process.on('unhandledRejection', e => {
  console.log(e);
  process.exit(1);
}); // 定义插件策略

Reflect.defineMetadata('PluginsType', _types.PluginType, Service);