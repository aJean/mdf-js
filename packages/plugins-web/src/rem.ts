import { IApi } from '@mdfjs/types';

/**
 * @file 响应式方案
 */

export default function initRem(api: IApi, rem: any) {
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
