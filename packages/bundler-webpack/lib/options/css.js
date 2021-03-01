"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createCssRule;

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file chain css
 */
function createCssRule(chain, opts) {
  const isDev = opts.isDev,
        paths = opts.paths,
        lang = opts.lang,
        test = opts.test;
  const isChange = /^(https?:)?\/\/|\//.test(paths.publicPath);
  const rule = chain.module.rule(lang).test(test); // 使用 css module

  applyLoaders(rule.oneOf('css-modules').resourceQuery(/module/), true, isChange, isDev, lang);
  applyLoaders(rule.oneOf('css'), false, isChange, isDev, lang);
}

function applyLoaders(rule, useModule, isChange, isDev, lang) {
  const sourceMap = !!isDev;

  if (isDev) {
    rule.use('styleLoader').loader(require.resolve('style-loader'));
  } else {
    rule.use('extractCssLoader').loader(_miniCssExtractPlugin.default.loader).options(isChange ? {} : {
      publicPath: '../'
    });
  }

  rule.use('cssLoader').loader(require.resolve('css-loader')).options({
    importLoaders: 1,
    sourceMap,
    modules: useModule ? {
      localIdentName: '[name]__[local]--[hash:base64:5]'
    } : false
  });
  rule.use('postcssLoader').loader(require.resolve('postcss-loader')).options({
    postcssOptions: {
      ident: 'postcss',
      plugins: [require('postcss-preset-env')({
        autoprefixer: {
          grid: false
        }
      }), require('postcss-normalize')(), isDev ? false : require('cssnano')].filter(Boolean)
    },
    sourceMap
  });

  switch (lang) {
    case 'sass':
      rule.use('sassLoader').loader(require.resolve('resolve-url-loader')).options({
        sourceMap
      }).loader(require.resolve('sass-loader')).options({
        sourceMap
      });
      break;

    case 'less':
      rule.use('lessLoader').loader(require.resolve('less-loader')).options({
        sourceMap
      });
      break;
  }
}