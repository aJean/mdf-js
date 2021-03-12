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
        PluginType = api.PluginType; // test: 修改用户配置

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
          spinner: 'dots'
        }).start();
        api.makeDir(paths.absTmpPath);
        yield generateCode(api);
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

        });
        api.invokePlugin({
          key: 'onBuildComplete',
          type: PluginType.event
        }); // dev pipeline

        const _bundler$setupDev = bundler.setupDev(),
              webpackCompiler = _bundler$setupDev.webpackCompiler,
              serverOpts = _bundler$setupDev.serverOpts;

        const server = new _server.DevServer({
          webpackCompiler,
          serverOpts,

          onFinish() {
            api.invokePlugin({
              key: 'processDone',
              type: PluginType.flush
            }); // workServer 只配置开关，读取 proxy 放在 server 内部处理

            if (config.workServer) {
              (0, _server.startWorkServer)(config.workServer, function () {
                const unwatchProxy = (0, _utils.watch)({
                  path: (0, _path.resolve)('./config/proxy.json'),
                  onChange: function onChange() {
                    (0, _utils.chalkPrints)([[`restart: `, 'yellow'], ` workserver`]);
                    (0, _server.restartWorkServer)();
                  }
                });
                unwatchs.push(unwatchProxy);
              });
            }
          }

        });
        server.start(); // important watchs

        const unwatchs = [];
        const unwatchConfig = (0, _utils.watch)({
          path: (0, _path.resolve)('./config'),
          useMemo: true,
          onChange: function onChange(type, path) {
            // 代理服务会自己处理
            if (/proxy.json/.test(path)) {
              return;
            }

            (0, _utils.chalkPrints)([[`${type}: `, 'green'], ` ${path}`]);
            (0, _utils.chalkPrints)([[`restart: `, 'yellow'], ` mdf server`]);
            unwatchs.forEach(unwatch => unwatch());
            server.close();
            process.send({
              type: 'RESTART'
            });
          }
        }); // 变化比较快，没必要提示了

        const unwatchApp = (0, _utils.watch)({
          path: (0, _path.resolve)((0, _utils.genAppPath)(api)),
          onChange: function onChange() {
            generateCode(api);
          }
        });
        unwatchs.push(unwatchConfig, unwatchApp);
      })();
    }

  });
}

function generateCode(api) {
  return api.invokePlugin({
    key: 'codeGenerate',
    type: api.PluginType.event
  });
}