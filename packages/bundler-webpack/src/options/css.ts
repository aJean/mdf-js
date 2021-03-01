import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import Chain from 'webpack-chain';

/**
 * @file chain css
 */

export default function createCssRule(chain: Chain, opts: any) {
  const { isDev, paths, lang, test } = opts;
  const isChange = /^(https?:)?\/\/|\//.test(paths.publicPath);
  const rule = chain.module.rule(lang).test(test);
  // 使用 css module
  applyLoaders(rule.oneOf('css-modules').resourceQuery(/module/), true, isChange, isDev, lang);
  applyLoaders(rule.oneOf('css'), false, isChange, isDev, lang);
}

function applyLoaders(
  rule: Chain.Rule<Chain.Rule>,
  useModule: boolean,
  isChange: boolean,
  isDev: boolean,
  lang: string,
) {
  const sourceMap = !!isDev;

  if (isDev) {
    rule.use('styleLoader').loader(require.resolve('style-loader'));
  } else {
    rule
      .use('extractCssLoader')
      .loader(MiniCssExtractPlugin.loader)
      .options(isChange ? {} : { publicPath: '../' });
  }

  rule
    .use('cssLoader')
    .loader(require.resolve('css-loader'))
    .options({
      importLoaders: 1,
      sourceMap,
      modules: useModule
        ? {
            localIdentName: '[name]__[local]--[hash:base64:5]',
          }
        : false,
    });

  rule
    .use('postcssLoader')
    .loader(require.resolve('postcss-loader'))
    .options({
      postcssOptions: {
        ident: 'postcss',
        plugins: [
          require('postcss-preset-env')({
            autoprefixer: { grid: false },
          }),
          require('postcss-normalize')(),
          isDev ? false : require('cssnano'),
        ].filter(Boolean),
      },

      sourceMap,
    });

  switch (lang) {
    case 'sass':
      rule
        .use('sassLoader')
        .loader(require.resolve('resolve-url-loader'))
        .options({
          sourceMap,
        })
        .loader(require.resolve('sass-loader'))
        .options({ sourceMap });
      break;
    case 'less':
      rule.use('lessLoader').loader(require.resolve('less-loader')).options({ sourceMap });
      break;
  }
}
