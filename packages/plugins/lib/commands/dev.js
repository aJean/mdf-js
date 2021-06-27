"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _bundlerWebpack = _interopRequireDefault(require("@mdfjs/bundler-webpack"));

var _server = require("@mdfjs/server");

var _utils = require("@mdfjs/utils");

var _path = require("path");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @file 本地开发，需要 watch
 */
function _default(api) {
  const paths = api.paths,
        PluginType = api.PluginType; // @test 修改用户配置

  api.changeUserConfig(function (config) {
    // config.devServer.port = 9999;
    return config;
  });
  api.registerCommand({
    name: 'dev',

    fn() {
      return _asyncToGenerator(function* () {
        const config = api.getConfig();
        const spinner = new _utils.Spinner({
          text: 'generate mdf\n',
          graph: 'dots'
        }).start();
        api.makeDir(paths.absTmpPath);
        yield api.codeGenerate();
        spinner.succeed({
          text: 'generate success',
          color: 'yellow'
        }); // instance

        config.isDev = true;
        const bundler = new _bundlerWebpack.default(config);
        bundler.generateConfig({
          changeUserConfig(userConfig) {
            return api.invokePlugin({
              type: PluginType.modify,
              key: 'userConfig',
              initValue: userConfig
            });
          },

          changeWebpackConfig(chain) {
            return api.invokePlugin({
              type: PluginType.event,
              key: 'chainWebpack',
              args: [chain]
            });
          },

          changeBundleConfig(bundleConfig) {
            return api.invokePlugin({
              type: PluginType.modify,
              key: 'bundleConfig',
              initValue: bundleConfig
            });
          }

        }); // dev pipeline

        const _bundler$setupDev = bundler.setupDev(),
              webpackCompiler = _bundler$setupDev.webpackCompiler,
              serverOpts = _bundler$setupDev.serverOpts;

        const workServer = config.workServer;
        const reqs = Promise.all([(0, _server.startDevServer)(webpackCompiler, serverOpts), workServer ? (0, _server.startWorkServer)(workServer) : null]);
        return reqs.then(res => {
          const devRes = res[0];
          const workRes = res[1]; // 必须加个延时，要在 webpack 之后输出

          setTimeout(function () {
            api.invokePlugin({
              key: 'processDone',
              type: PluginType.flush
            });
            (0, _utils.chalkPrints)([[`\nsuccess: `, 'green'], ` mdf server`]);
            console.log(` - ${devRes.msg}`);
            workRes.msg && console.log(` - ${workRes.msg}`);
            initWatchers(api, devRes.server, !!workRes);
          }, 800);
        });
      })();
    }

  });
}
/**
 * 初始化监控
 */


function initWatchers(api, server, useProxy = false) {
  const unwatchs = [];
  unwatchs.push((0, _utils.watch)({
    path: (0, _path.resolve)('./config'),
    useMemo: true,
    exclude: /proxy.json/i,
    onChange: function onChange(type, path) {
      (0, _utils.chalkPrints)([[`${type}: `, 'green'], ` ${path}`]);
      (0, _utils.chalkPrints)([[`restart: `, 'yellow'], ` dev-server`]);
      unwatchs.forEach(unwatch => unwatch());
      server.close();
      process.send({
        type: 'RESTART'
      });
    }
  })); // 监听 app.ts

  unwatchs.push((0, _utils.watch)({
    path: (0, _path.resolve)((0, _utils.genAppPath)(api)),

    onChange() {
      api.codeGenerate();
    }

  }));

  if (useProxy) {
    // 读取 proxy 放在 work-server 内部处理
    unwatchs.push((0, _utils.watch)({
      path: (0, _path.resolve)('./config/proxy.json'),

      onChange() {
        process.stdout.write('\x1B[2J\x1B[3J\x1B[H');
        (0, _utils.chalkPrints)([[`restart: `, 'yellow'], ` work-server`]);
        (0, _server.restartWorkServer)();
      }

    }));
  }

  return unwatchs;
}