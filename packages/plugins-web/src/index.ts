import { IApi, IJoi } from '@mdfjs/types';
import SentryWebpackPlugin from '@sentry/webpack-plugin';
import path from 'path';
import initGio from './growingio';
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

  api.describe({
    key: 'sentry',
    config: {
      schema(joi: IJoi) {
        return joi.object({
          enable: joi.boolean(),
          dsn: joi.any(),
          urlPrefix: joi.array(),
        });
      },

      default: {
        enable: false,
        dsn: '',
        urlPrefix: [''],
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
    const pxtorem = require('postcss-pxtorem');
    const rules = ['css', 'less', 'sass'];

    const appendRemToPostcssOptions = (opts: any) => {
      opts.postcssOptions.plugins.unshift(
        pxtorem({
          rootValue: rem.rootValue || 100,
          unitPrecision: 5,
          minPixelValue: 2,
          propList: ['*'],
          exclude: /node_modules/i,
        }),
      );

      return opts;
    };

    api.chainWebpack((chain) => {
      rules.forEach((rule) => {
        chain.module.rule(rule).oneOf('css').use('postcssLoader').tap(appendRemToPostcssOptions);

        chain.module
          .rule(rule)
          .oneOf('css-modules')
          .use('postcssLoader')
          .tap(appendRemToPostcssOptions);
      });
    });

    api.addRuntimePlugin(() => require.resolve('./plugins/rem'));
  }

  // gio 统计，即将用新的埋点 sdk
  if (isEnable(growingio)) {
    initGio(api, growingio);
  }

  // sentry
  if (isEnable(sentry)) {
    api.chainWebpack((chain) => {
      chain.plugin('sentry').use(SentryWebpackPlugin, [
        {
          release: `${config.PRO_NAME}-${config.PRO_VERSION}`,
          entries: [],
          include: chain.output.get('path'),
          ignoreFile: '.sentrycliignore',
          configFile: '.sentryclirc',
          stripPrefix: [path.dirname(chain.output.get('path'))],
          rewrite: true,
        },
      ]);
    });

    api.addRuntimePlugin(() => require.resolve('./plugins/sentry'));
  }
}

function isEnable(data: any) {
  return data && data.enable;
}
