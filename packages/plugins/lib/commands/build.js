"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _bundlerWebpack = _interopRequireDefault(require("@mdfjs/bundler-webpack"));

var _utils = require("@mdfjs/utils");

var _ora = _interopRequireDefault(require("ora"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * @file 构建 prod
 */
function _default(api) {
  const paths = api.paths,
        PluginType = api.PluginType;
  api.registerCommand({
    name: 'build',

    fn() {
      return _asyncToGenerator(function* () {
        const config = api.getConfig();
        const spinner = (0, _ora.default)({
          text: 'generate mdf\n',
          spinner: 'dots'
        }).start();
        api.makeDir(paths.absTmpPath);
        yield generateCode(api); // instance

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
        });
        setTimeout(function () {
          spinner.color = 'yellow';
          spinner.succeed('generate success');
          bundler.build().catch(e => (0, _utils.errorPrint)(e)).finally(() => {
            api.invokePlugin({
              key: 'processDone',
              type: PluginType.flush
            });
            process.exit(0);
          });
        }, 1000);
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