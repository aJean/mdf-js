"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackChain = _interopRequireDefault(require("webpack-chain"));

var _cleanWebpackPlugin = require("clean-webpack-plugin");

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _terserWebpackPlugin = _interopRequireDefault(require("terser-webpack-plugin"));

var _copyWebpackPlugin = _interopRequireDefault(require("copy-webpack-plugin"));

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

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
  const isDev = userConfig.isDev;
  const paths = (0, _paths.default)(userConfig);
  const defines = (0, _env.default)(userConfig);
  const chain = new _webpackChain.default();
  chain.target('web').mode(isDev ? 'development' : 'production');
  chain.devtool(isDev ? 'cheap-module-source-map' : 'hidden-source-map'); // entry

  const entry = chain.entry('main');
  chain.when(isDev, () => {
    entry.add(paths.appEntry);
  }, () => {
    // runtime public path
    paths.rtEntry && entry.add(paths.rtEntry);
    entry.add(paths.appEntry);
  }); // output

  chain.output.path(paths.appDist).filename(isDev ? 'js/[name].js' : 'js/[name].[contenthash:10].js').chunkFilename(isDev ? 'js/[name].js' : 'js/[name].[contenthash:10].async.js').publicPath(paths.publicPath); // babel

  chain.module.rule('babelJs').test(/\.(js|jsx|ts|tsx)$/).exclude.add(/node_modules/).end().use('babelLoader').loader(require.resolve('babel-loader')).options((0, _babel.default)({
    isDev
  }));
  chain.module.rule('svg').test(/\.svg$/).use('svgLoader').loader(require.resolve('@svgr/webpack'));
  chain.module.rule('mdx').test(/\.mdx?$/).use('mdxLoader').loader(require.resolve('babel-loader')).options((0, _babel.default)({
    isDev
  })).loader(require.resolve('@mdx-js/loader'));
  chain.module.rule('static').test(/\.(ico|png|jpg|jpeg|gif|webp|woff|woff2|eot|ttf|otf|ogg|mp3|mp4|m4v)$/i).use('staticLoader').loader(require.resolve('url-loader')).options({
    limit: 8096,
    esModule: false,
    name: 'static/[name].[contenthash:10].[ext]'
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

  chain.resolve.extensions.merge(['.js', '.jsx', '.ts', '.tsx']).end().mainFields.merge(['browser', 'module', 'main']).end().alias.merge(_objectSpread({
    'react-native': 'react-native-web',
    // 使用内置的 react 版本
    'react-dom': require.resolve('react-dom'),
    react: require.resolve('react')
  }, paths.moduleAlias)); // plugins

  chain.plugin('definePlugin').use(_webpack.default.DefinePlugin, [{
    'process.version': JSON.stringify(process.version),
    'process.env': JSON.stringify(defines)
  }]); // dev 不使用 progress
  // chain.plugin('progressPlugin').use(WebpackBar);
  // chain.plugin('progressPlugin').use(
  //   new webpack.ProgressPlugin((percentage, message, ...args) => {
  //     process.stdout.clearLine(0);
  //     process.stdout.cursorTo(0);
  //     process.stdout.write(`${Math.round(percentage * 100)}% - ${message} ${args}`);
  //   }),
  // );

  chain.plugin('htmlPlugin').use(_htmlWebpackPlugin.default, [{
    filename: './index.html',
    template: paths.htmlTemplatePath,
    templateParameters: _objectSpread(_objectSpread({}, defines), {}, {
      MDF_SCRIPT: !isDev && paths.rtScript || '',
      MDF_PUBLIC_URL: isDev ? '' : paths.publicPath.replace(/\/$/, '')
    })
  }]); // 忽略语言包

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
  chain.when(isDev, // webpack-dev-middleware 现在直接使用 webpack 的配置了
  () => {
    chain.plugin('hotPlugin').use(_webpack.default.HotModuleReplacementPlugin);
    chain.watchOptions({
      ignored: /node_modules/,
      aggregateTimeout: 300
    });
    chain.stats({
      all: false,
      assets: true,
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
    })); // 输出 stats

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