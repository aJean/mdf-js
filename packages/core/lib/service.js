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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

/**
 * @file core service
 * plugins、pluginConfigs 全部以 key value 形式存储
 */
class Service {
  // 必须的路径
  // 原始插件资产
  // init 后的插件资产
  // define plugin config
  // cli 命令
  // 运行时插件的 valid key
  constructor(presets) {
    this.config = null;
    this.paths = Utils.getPaths();
    this.presets = void 0;
    this.plugins = {};
    this.pluginConfigs = {};
    this.commands = {};
    this.runtimeKeys = [];
    // 没经过处理的 user config
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

      case _types.PluginType.event:
        list.forEach(fn => Utils.runInContext(fn, args));
        return undefined;
      // generate code 专用

      case _types.PluginType.code:
        const fns = list.filter(plugin => plugin.fn);
        const resolves = list.filter(plugin => plugin.resolve);
        const lasts = list.filter(plugin => plugin.last);

        const next = function next() {
          const plugin = resolves.shift();

          if (!plugin) {
            return lasts.length ? Promise.all(lasts.map(plugin => Utils.runPlugin(plugin, 'last').catch(e => {
              throw new Error(`[plugin ${plugin.name}] ${e.message}`);
            }))) : Promise.resolve(null);
          }

          return Utils.runPlugin(plugin, 'resolve').then(() => next()).catch(e => {
            throw new Error(`[plugin ${plugin.name}] ${e.message}`);
          });
        };

        fns.forEach(plugin => {
          try {
            Utils.runInContext(plugin.fn, args);
          } catch (e) {
            throw new Error(`[plugin ${plugin.name}] ${e.message}`);
          }
        });
        return next();
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
   * 执行 cli 命令
   */


  runCommand(name, data = {}) {
    var _this = this;

    return _asyncToGenerator(function* () {
      try {
        _this.initPresets();

        _this.invokePlugin({
          key: 'onStart',
          type: _types.PluginType.event,
          args: [data]
        }); // 收集 config 目录里面的配置并验证


        _this.config = (0, _getConfig.getConfig)(_this);
        yield _this.commands[name].fn(data);
      } catch (e) {
        Utils.chalkPrint(`run command-${name} failed`, 'red');
        console.log(Utils.parseError(e.message));
        process.exit(0);
      }
    })();
  }

} // 因为绝大部分异常都是跟 invokePlugin 相关的，所以放到这处理


exports.default = Service;
process.on('unhandledRejection', e => {
  console.log(e);
  process.exit(0);
}); // 定义插件策略

Reflect.defineMetadata('PluginsType', _types.PluginType, Service);