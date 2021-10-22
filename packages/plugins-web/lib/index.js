"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _growingio = _interopRequireDefault(require("./growingio"));

var _sentry = _interopRequireDefault(require("./sentry"));

var _rem = _interopRequireDefault(require("./rem"));

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
  }); // sentry

  api.describe({
    key: 'sentry',
    config: {
      schema(joi) {
        return joi.object({
          enable: joi.boolean(),
          stripPrefix: joi.array(),
          release: joi.string(),
          dsn: joi.any(),
          org: joi.string(),
          project: joi.string()
        });
      },

      default: {
        enable: false
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
    (0, _rem.default)(api, rem);
  } // gio 统计，即将用新的埋点 sdk


  if (isEnable(growingio)) {
    (0, _growingio.default)(api, growingio);
  } // sentry


  if (isEnable(sentry)) {
    sentry.release = `${config.PRO_NAME}@${config.PRO_VERSION}`;
    (0, _sentry.default)(api, sentry);
  }
}

function isEnable(data) {
  return data && data.enable;
}