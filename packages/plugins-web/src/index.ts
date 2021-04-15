import { IApi, IJoi } from '@mdfjs/types';
import initGio from './growingio';
import initSentry from './sentry';
import initRem from './rem';
import initHttp from './http/init';

/**
 * @file 开发 web、H5 项目可能用到的功能
 */

export default function (api: IApi) {
  // 定义的插件配置才可以被运行时读取到
  api.describe({
    key: 'trace',
    config: {
      schema(joi: IJoi) {
        return joi.object({
          enable: joi.boolean(),
        });
      },
    },
  });

  api.describe({
    key: 'vconsole',
    config: {
      schema(joi: IJoi) {
        return joi.object({
          enable: joi.boolean(),
        });
      },
    },
  });

  api.describe({
    key: 'rem',
    config: {
      schema(joi: IJoi) {
        return joi.object({
          enable: joi.boolean(),
          designWidth: joi.number(),
          maxWidth: joi.number(),
          rootValue: joi.number(),
        });
      },

      default: {
        enable: false,
        designWidth: 750,
        maxWidth: 900,
        rootValue: 100,
      },
    },
  });

  api.describe({
    key: 'growingio',
    config: {
      schema(joi: IJoi) {
        return joi.object({
          enable: joi.boolean(),
          key: joi.string(),
          hashtag: joi.boolean(),
          debug: joi.boolean(),
        });
      },

      default: {
        enable: false,
        key: null,
        hashtag: true,
        debug: false,
      },
    },
  });

  // sentry
  api.describe({
    key: 'sentry',
    config: {
      schema(joi: IJoi) {
        return joi.object({
          enable: joi.boolean(),
          stripPrefix: joi.array(),
          release: joi.string(),
          dsn: joi.any().required(),
          org: joi.string().required(),
          project: joi.string().required(),
        });
      },

      default: {
        enable: false,
      },
    },
  });

  const config = api.getConfig();
  const { vconsole, growingio, rem, sentry, trace } = config;

  // http tools
  initHttp(api, isEnable(trace));

  // vconsole 模拟控制台
  if (isEnable(vconsole)) {
    api.addRuntimePlugin(() => require.resolve('./plugins/vconsole'));
  }

  // 响应式
  if (isEnable(rem)) {
    initRem(api, rem);
  }

  // gio 统计，即将用新的埋点 sdk
  if (isEnable(growingio)) {
    initGio(api, growingio);
  }

  // sentry
  if (isEnable(sentry)) {
    sentry.release = `${config.PRO_NAME}@${config.PRO_VERSION}`;
    initSentry(api, sentry);
  }
}

function isEnable(data: any) {
  return data && data.enable;
}
