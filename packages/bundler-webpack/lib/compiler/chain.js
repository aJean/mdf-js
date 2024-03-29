"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _utils = require("@mdfjs/utils");

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackChain = _interopRequireDefault(require("webpack-chain"));

var _cleanWebpackPlugin = require("clean-webpack-plugin");

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _terserWebpackPlugin = _interopRequireDefault(require("terser-webpack-plugin"));

var _copyWebpackPlugin = _interopRequireDefault(require("copy-webpack-plugin"));

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

var _tempWebpackbar = _interopRequireDefault(require("temp-webpackbar"));

var _paths = _interopRequireDefault(require("../options/paths"));

var _env = _interopRequireDefault(require("../options/env"));

var _css = _interopRequireDefault(require("../options/css"));

var _babel = _interopRequireDefault(require("./babel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @file create webpack config chain
 */
function _default(userConfig) {
  const isDev = userConfig.isDev,
        project = userConfig.project;
  const paths = (0, _paths.default)(userConfig);
  const defines = (0, _env.default)(userConfig);
  const chain = new _webpackChain.default();
  chain.target('web').mode(isDev ? 'development' : 'production');
  chain.devtool(isDev ? 'cheap-module-source-map' : 'hidden-source-map'); // 入口配置，对应 webpack entry 属性

  const genEntries = runtimeEntry => {
    (0, _utils.fromMeta)(project.multi, meta => {
      const entry = chain.entry(meta.NAME);
      runtimeEntry && entry.add(runtimeEntry);
      entry.add(meta.FILE);
    });
  };

  chain.when(isDev, () => genEntries(), // build need runtime public path
  () => genEntries(paths.runtimeEntry)); // output

  chain.output.path(paths.appDist).filename(`js/${isDev ? '[name].js' : '[name].[contenthash:10].js'}`).chunkFilename(`js/${isDev ? '[name].js' : '[name].[contenthash:10].async.js'}`).publicPath(paths.publicPath); // babel

  chain.module.rule('babelJs').test(/\.(js|jsx|ts|tsx)$/).exclude.add(/node_modules/).end().use('babelLoader').loader(require.resolve('babel-loader')).options((0, _babel.default)({
    isDev
  }));
  chain.module.rule('svg').test(/\.svg$/).use('svgLoader').loader(require.resolve('@svgr/webpack'));
  chain.module.rule('mdx').test(/\.mdx?$/).use('mdxLoader').loader(require.resolve('babel-loader')).options((0, _babel.default)({
    isDev
  })).loader(require.resolve('@mdx-js/loader')); // 资源类

  chain.module.rule('assets-img').test(/\.(ico|png|jpg|jpeg|gif|webp)$/i).merge({
    type: 'asset',
    generator: {
      filename: 'img/[name].[contenthash:10].[ext]'
    },
    parser: {
      dataUrlCondition: {
        maxSize: 8 * 1024
      }
    }
  });
  chain.module.rule('assets-font').test(/\.(woff|woff2|eot|ttf|otf|ogg)$/i).merge({
    type: 'asset/resource',
    generator: {
      filename: 'font/[name].[contenthash:10].[ext]'
    }
  });
  chain.module.rule('assets-audio').test(/\.(mp3|mp4|m4v)$/i).merge({
    type: 'asset/resource',
    generator: {
      filename: 'audio/[name].[contenthash:10].[ext]'
    }
  }); // css

  (0, _css.default)(chain, {
    lang: 'css',
    test: /\.css$/,
    isDev,
    paths
  }); // less

  (0, _css.default)(chain, {
    lang: 'less',
    test: /\.less$/,
    isDev,
    paths
  }); // sass

  (0, _css.default)(chain, {
    lang: 'sass',
    test: /\.scss$/,
    isDev,
    paths
  }); // node shims

  chain.resolve.merge({
    fallback: {
      setImmediate: false,
      module: 'empty',
      dns: 'mock',
      http2: 'empty',
      process: 'mock',
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    }
  }); // resolves

  chain.resolve.extensions.merge(['.js', '.jsx', '.ts', '.tsx', '.vue']).end().mainFields.merge(['browser', 'module', 'main']).end() // tsConfig paths，defineConfig 会使用
  .alias.merge(_objectSpread({}, paths.moduleAlias)); // plugins

  chain.plugin('definePlugin').use(_webpack.default.DefinePlugin, [{
    'process.version': JSON.stringify(process.version),
    'process.env': JSON.stringify(defines)
  }]); // show progress

  chain.plugin('progressPlugin').use(_tempWebpackbar.default); // 多入口 -> 多页面

  (0, _utils.fromMeta)(project.multi, meta => {
    const NAME = meta.NAME;
    chain.plugin(`htmlPlugin-${NAME}`).use(_htmlWebpackPlugin.default, [{
      filename: `./${NAME}.html`,
      chunks: [NAME],
      template: paths.htmlTemplatePath,
      templateParameters: _objectSpread(_objectSpread({}, defines), {}, {
        MDF_SCRIPT: !isDev && paths.runtimeScript || '',
        MDF_PUBLIC_URL: isDev ? '' : paths.publicPath.replace(/\/$/, '')
      })
    }]);
  }); // 忽略语言包

  chain.plugin('ignorePlugin').use(_webpack.default.IgnorePlugin, [{
    resourceRegExp: /^\.\/locale$/,
    contextRegExp: /moment$/
  }]); // 打包策略

  chain.optimization.splitChunks({
    cacheGroups: {
      polyfill: {
        chunks: 'all',
        test: /core-js|regenerator-runtime/,
        name: 'polyfill',
        enforce: true,
        priority: -20
      },
      vendors: {
        chunks: 'initial',
        test: module => {
          return /node_modules/.test(module.resource);
        },
        name: 'vendors',
        enforce: true,
        priority: -30
      }
    }
  });
  chain.when(isDev, () => {
    // webpack-dev-middleware 现在直接使用 webpack 的配置了
    chain.plugin('hotPlugin').use(_webpack.default.HotModuleReplacementPlugin); // 监听性能

    chain.watchOptions({
      ignored: /node_modules/,
      aggregateTimeout: 500
    });
    chain.stats({
      all: false,
      assets: false,
      warnings: true,
      errors: true,
      colors: true,
      modules: false,
      errorDetails: false
    });
  }, // 生产环境配置
  () => {
    // 清除 dist
    chain.plugin('cleanPlugin').use(_cleanWebpackPlugin.CleanWebpackPlugin); // copy plugin

    chain.plugin('copyPlugin').use(new _copyWebpackPlugin.default({
      patterns: [{
        from: paths.appPublic,
        to: paths.appDist
      }]
    }));
    chain.plugin('miniCssPlugin').use(new _miniCssExtractPlugin.default({
      filename: 'css/style.[contenthash:10].css',
      chunkFilename: 'css/[name].[contenthash:10].css',
      ignoreOrder: true
    })); // 性能分析

    project.smp && chain.plugin('smpPlugin').use(require('temp-smp')); // 输出 stats

    chain.stats({
      assets: true,
      assetsSort: '!size',
      chunks: false,
      builtAt: false,
      entrypoints: false,
      children: false,
      modules: false,
      colors: true,
      timings: true,
      excludeAssets: assetName => assetName.endsWith('.map')
    }); // 重写优化配置

    chain.optimization.merge({
      minimize: true,
      nodeEnv: 'production',
      flagIncludedChunks: true,
      sideEffects: true,
      usedExports: true,
      concatenateModules: true,
      runtimeChunk: 'single',
      emitOnErrors: false,
      checkWasmTypes: true,
      realContentHash: true
    }); // 压缩

    chain.optimization.minimizer('terser').use(_terserWebpackPlugin.default, [{
      terserOptions: {
        parse: {
          ecma: 2019
        },
        compress: {
          ecma: 5,
          comparisons: false,
          inline: 2
        },
        mangle: {
          safari10: true
        },
        output: {
          ecma: 5,
          comments: false,
          ascii_only: true
        }
      },
      extractComments: false
    }]);
  });
  return chain;
}