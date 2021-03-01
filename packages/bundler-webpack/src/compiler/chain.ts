import webpack from 'webpack';
import Chain from 'webpack-chain';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebpackBar from 'webpackbar';
import resolvePaths from '../options/paths';
import resolveEnv from '../options/env';
import createCssRule from '../options/css';
import geBabelOpts from './babel';

/**
 * @file create webpack config chain
 */

export default function(userConfig: any) {
  const { isDev } = userConfig;
  const paths = resolvePaths(userConfig);
  const defines = resolveEnv(userConfig);
  const chain = new Chain();

  chain.target('web').mode(isDev ? 'development' : 'production');
  chain.devtool(isDev ? 'cheap-module-source-map' : 'hidden-source-map');

  // entry
  const entry = chain.entry('main');

  chain.when(
    isDev,
    () => {
      entry.add(paths.appEntry);
    },
    () => {
      // runtime public path
      paths.rtEntry && entry.add(paths.rtEntry);
      entry.add(paths.appEntry);
    },
  );

  // output
  chain.output
    .path(paths.appDist)
    .filename(isDev ? 'js/[name].js' : 'js/[name].[contentHash:10].js')
    .chunkFilename(isDev ? 'js/[name].js' : 'js/[name].[contentHash:10].async.js')
    .publicPath(paths.publicPath);

  // babel
  chain.module
    .rule('babelJs')
    .test(/\.(js|jsx|ts|tsx)$/)
    .exclude.add(/node_modules/)
    .end()
    .use('babelLoader')
    .loader(require.resolve('babel-loader'))
    .options(geBabelOpts({ isDev }));

  chain.module
    .rule('svg')
    .test(/\.svg$/)
    .use('svgLoader')
    .loader(require.resolve('@svgr/webpack'));

  chain.module
    .rule('mdx')
    .test(/\.mdx?$/)
    .use('mdxLoader')
    .loader(require.resolve('babel-loader'))
    .options(geBabelOpts({ isDev }))
    .loader(require.resolve('@mdx-js/loader'));

  chain.module
    .rule('static')
    .test(/\.(ico|png|jpg|jpeg|gif|webp|woff|woff2|eot|ttf|otf|ogg|mp3|mp4|m4v)$/i)
    .use('staticLoader')
    .loader(require.resolve('url-loader'))
    .options({
      limit: 8096,
      esModule: false,
      name: 'static/[name].[contenthash:10].[ext]',
    });

  // css
  createCssRule(chain, { lang: 'css', test: /\.css$/, isDev, paths });
  // less
  createCssRule(chain, { lang: 'less', test: /\.less$/, isDev, paths });
  // sass
  createCssRule(chain, { lang: 'sass', test: /\.scss$/, isDev, paths });

  // node shims
  chain.node.merge({
    setImmediate: false,
    module: 'empty',
    dns: 'mock',
    http2: 'empty',
    process: 'mock',
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  });

  // resolves
  chain.resolve.extensions
    .merge(['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.js', '.jsx', '.ts', '.tsx'])
    .end()
    .mainFields.merge(['browser', 'module', 'main'])
    .end()
    .alias.merge({
      'react-native': 'react-native-web',
      // 使用内置的 react 版本
      'react-dom': require.resolve('react-dom'),
      react: require.resolve('react'),
      // tsConfig paths，defineConfig 会使用
      ...paths.moduleAlias,
    });

  // plugins
  chain.plugin('definePlugin').use(webpack.DefinePlugin, [
    {
      'process.version': JSON.stringify(process.version), // node
      'process.env': JSON.stringify(defines),
    },
  ]);

  chain.plugin('progressPlugin').use(WebpackBar);
  chain.plugin('htmlPlugin').use(HtmlWebpackPlugin, [
    {
      filename: './index.html',
      template: paths.htmlTemplatePath,
      templateParameters: {
        ...defines,
        MDF_SCRIPT: (!isDev && paths.rtScript) || '',
        MDF_PUBLIC_URL: isDev ? '' : paths.publicPath.replace(/\/$/, ''),
      },
    },
  ]);

  chain.plugin('ignorePlugin').use(webpack.IgnorePlugin, [/^\.\/locale$/, /moment$/]);

  // 打包策略
  chain.optimization.splitChunks({
    cacheGroups: {
      polyfill: {
        chunks: 'all',
        test: /core-js|regenerator-runtime/,
        name: 'polyfill',
        enforce: true,
        priority: -20,
      },
      vendors: {
        chunks: 'initial',
        test: (module: any) => {
          return /node_modules/.test(module.resource);
        },
        name: 'vendors',
        enforce: true,
        priority: -30,
      },
    },
  });

  chain.when(
    isDev,
    // webpack-dev-middleware 现在直接使用 webpack 的配置了
    () => {
      chain.plugin('hotPlugin').use(webpack.HotModuleReplacementPlugin);

      chain.watchOptions({ ignored: /node_modules/, aggregateTimeout: 300 });

      chain.stats({
        all: false,
        assets: true,
        warnings: true,
        errors: true,
        colors: true,
        modules: false,
        errorDetails: false,
      });
    },
    // 生产环境配置
    () => {
      // 清除 dist
      chain.plugin('cleanPlugin').use(CleanWebpackPlugin);

      // copy plugin
      chain
        .plugin('copyPlugin')
        .use(new CopyPlugin({ patterns: [{ from: paths.appPublic, to: paths.appDist }] }));

      chain.plugin('miniCssPlugin').use(
        new MiniCssExtractPlugin({
          filename: 'css/style.[contenthash].css',
          chunkFilename: 'css/[name].[contenthash].css',
          ignoreOrder: true,
        }),
      );

      // 输出 stats
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
        excludeAssets: (assetName: string) => assetName.endsWith('.map'),
      });

      // 重写优化配置
      chain.optimization.merge({
        minimize: true,
        namedModules: false,
        namedChunks: false,
        nodeEnv: 'production',
        flagIncludedChunks: true,
        occurrenceOrder: true,
        sideEffects: true,
        usedExports: true,
        concatenateModules: true,
        runtimeChunk: 'single',
        noEmitOnErrors: true,
        checkWasmTypes: true,
      });

      // 压缩
      chain.optimization.minimizer('terser').use(TerserPlugin, [
        {
          terserOptions: {
            parse: { ecma: 2019 },
            compress: { ecma: 5, comparisons: false, inline: 2 },
            mangle: { safari10: true },
            output: { ecma: 5, comments: false, ascii_only: true },
          },
          extractComments: false,
        },
      ]);
    },
  );

  return chain;
}
