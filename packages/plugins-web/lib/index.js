"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _webpackPlugin = _interopRequireDefault(require("@sentry/webpack-plugin"));

var _path = _interopRequireDefault(require("path"));

var _growingio = _interopRequireDefault(require("./growingio"));

var _init = _interopRequireDefault(require("./http/init"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file 开发 web、H5 项目可能用到的功能
 */
function _default(api) {
  // 定义的插件配置才可以被运行时读取到
  api.describe({
    key: 'trace',
    config: {
      schema(joi) {
        return joi.object({
          enable: joi.boolean()
        });
      }

    }
  });
  api.describe({
    key: 'vconsole',
    config: {
      schema(joi) {
        return joi.object({
          enable: joi.boolean()
        });
      }

    }
  });
  api.describe({
    key: 'rem',
    config: {
      schema(joi) {
        return joi.object({
          enable: joi.boolean(),
          designWidth: joi.number(),
          maxWidth: joi.number(),
          rootValue: joi.number()
        });
      },

      default: {
        enable: false,
        designWidth: 750,
        maxWidth: 900,
        rootValue: 100
      }
    }
  });
  api.describe({
    key: 'growingio',
    config: {
      schema(joi) {
        return joi.object({
          enable: joi.boolean(),
          key: joi.string(),
          hashtag: joi.boolean(),
          debug: joi.boolean()
        });
      },

      default: {
        enable: false,
        key: null,
        hashtag: true,
        debug: false
      }
    }
  });
  api.describe({
    key: 'sentry',
    config: {
      schema(joi) {
        return joi.object({
          enable: joi.boolean(),
          dsn: joi.any(),
          urlPrefix: joi.array()
        });
      },

      default: {
        enable: false,
        dsn: '',
        urlPrefix: ['']
      }
    }
  });
  const config = api.getConfig();
  const vconsole = config.vconsole,
        growingio = config.growingio,
        rem = config.rem,
        sentry = config.sentry,
        trace = config.trace; // http tools

  (0, _init.default)(api, isEnable(trace)); // vconsole 模拟控制台

  if (isEnable(vconsole)) {
    api.addRuntimePlugin(() => require.resolve('./plugins/vconsole'));
  } // 响应式


  if (isEnable(rem)) {
    const pxtorem = require('postcss-pxtorem');

    const rules = ['css', 'less', 'sass'];

    const appendRemToPostcssOptions = opts => {
      opts.postcssOptions.plugins.unshift(pxtorem({
        rootValue: rem.rootValue || 100,
        unitPrecision: 5,
        minPixelValue: 2,
        propList: ['*'],
        exclude: /node_modules/i
      }));
      return opts;
    };

    api.chainWebpack(chain => {
      rules.forEach(rule => {
        chain.module.rule(rule).oneOf('css').use('postcssLoader').tap(appendRemToPostcssOptions);
        chain.module.rule(rule).oneOf('css-modules').use('postcssLoader').tap(appendRemToPostcssOptions);
      });
    });
    api.addRuntimePlugin(() => require.resolve('./plugins/rem'));
  } // gio 统计，即将用新的埋点 sdk


  if (isEnable(growingio)) {
    (0, _growingio.default)(api, growingio);
  } // sentry


  if (isEnable(sentry)) {
    api.chainWebpack(chain => {
      chain.plugin('sentry').use(_webpackPlugin.default, [{
        release: `${config.PRO_NAME}-${config.PRO_VERSION}`,
        entries: [],
        include: chain.output.get('path'),
        ignoreFile: '.sentrycliignore',
        configFile: '.sentryclirc',
        stripPrefix: [_path.default.dirname(chain.output.get('path'))],
        rewrite: true
      }]);
    });
    api.addRuntimePlugin(() => require.resolve('./plugins/sentry'));
  }
}

function isEnable(data) {
  return data && data.enable;
}