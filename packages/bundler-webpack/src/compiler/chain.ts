import { fromMeta } from '@mdfjs/utils';
import webpack from 'webpack';
import Chain from 'webpack-chain';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebpackBar from 'temp-webpackbar';
import resolvePaths from '../options/paths';
import resolveEnv from '../options/env';
import createCssRule from '../options/css';
import geBabelOpts from './babel';

/**
 * @file create webpack config chain
 */

export default function (userConfig: any) {
  const { isDev, project } = userConfig;
  const paths = resolvePaths(userConfig);
  const defines = resolveEnv(userConfig);
  const chain = new Chain();

  chain.target('web').mode(isDev ? 'development' : 'production');
  chain.devtool(isDev ? 'cheap-module-source-map' : 'hidden-source-map');

  // 入口配置，对应 webpack entry 属性
  const genEntries = (runtimeEntry?: string) => {
    fromMeta(project.multi, (meta: any) => {
      const entry = chain.entry(meta.NAME);

      runtimeEntry && entry.add(runtimeEntry);
      entry.add(meta.FILE);
    });
  };

  chain.when(
    isDev,
    () => genEntries(),
    // build need runtime public path
    () => genEntries(paths.runtimeEntry),
  );

  // output
  chain.output
    .path(paths.appDist)
    .filename(`js/${isDev ? '[name].js' : '[name].[contenthash:10].js'}`)
    .chunkFilename(`js/${isDev ? '[name].js' : '[name].[contenthash:10].async.js'}`)
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

  // 资源类
  chain.module
    .rule('assets-img')
    .test(/\.(ico|png|jpg|jpeg|gif|webp)$/i)
    .merge({
      type: 'asset',
      generator: {
        filename: 'img/[name].[contenthash:10].[ext]',
      },
      parser: {
        dataUrlCondition: {
          maxSize: 8 * 1024,
        },
      },
    });

  chain.module
    .rule('assets-font')
    .test(/\.(woff|woff2|eot|ttf|otf|ogg)$/i)
    .merge({
      type: 'asset/resource',
      generator: {
        filename: 'font/[name].[contenthash:10].[ext]',
      },
    });

  chain.module
    .rule('assets-audio')
    .test(/\.(mp3|mp4|m4v)$/i)
    .merge({
      type: 'asset/resource',
      generator: {
        filename: 'audio/[name].[contenthash:10].[ext]',
      },
    });

  // css
  createCssRule(chain, { lang: 'css', test: /\.css$/, isDev, paths });
  // less
  createCssRule(chain, { lang: 'less', test: /\.less$/, isDev, paths });
  // sass
  createCssRule(chain, { lang: 'sass', test: /\.scss$/, isDev, paths });

  // node shims
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
      child_process: 'empty',
    },
  });

  // resolves
  chain.resolve.extensions
    .merge(['.js', '.jsx', '.ts', '.tsx', '.vue'])
    .end()
    .mainFields.merge(['browser', 'module', 'main'])
    .end()
    // tsConfig paths，defineConfig 会使用
    .alias.merge({ ...paths.moduleAlias });

  // plugins
  chain.plugin('definePlugin').use(webpack.DefinePlugin, [
    {
      'process.version': JSON.stringify(process.version), // node
      'process.env': JSON.stringify(defines),
    },
  ]);

  // show progress
  chain.plugin('progressPlugin').use(WebpackBar);

  // 多入口 -> 多页面
  fromMeta(project.multi, (meta: any) => {
    const NAME = meta.NAME;

    chain.plugin(`htmlPlugin-${NAME}`).use(HtmlWebpackPlugin, [
      {
        filename: `./${NAME}.html`,
        chunks: [NAME],
        template: paths.htmlTemplatePath,
        templateParameters: {
          ...defines,
          MDF_SCRIPT: (!isDev && paths.runtimeScript) || '',
          MDF_PUBLIC_URL: isDev ? '' : paths.publicPath.replace(/\/$/, ''),
        },
      },
    ]);
  });

  // 忽略语言包
  chain
    .plugin('ignorePlugin')
    .use(webpack.IgnorePlugin, [{ resourceRegExp: /^\.\/locale$/, contextRegExp: /moment$/ }]);

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
    () => {
      // webpack-dev-middleware 现在直接使用 webpack 的配置了
      chain.plugin('hotPlugin').use(webpack.HotModuleReplacementPlugin);
      // 监听性能
      chain.watchOptions({ ignored: /node_modules/, aggregateTimeout: 500 });

      chain.stats({
        all: false,
        assets: false,
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
          filename: 'css/style.[contenthash:10].css',
          chunkFilename: 'css/[name].[contenthash:10].css',
          ignoreOrder: true,
        }) as any,
      );

      // 性能分析
      project.smp && chain.plugin('smpPlugin').use(require('temp-smp'));

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
        nodeEnv: 'production',
        flagIncludedChunks: true,
        sideEffects: true,
        usedExports: true,
        concatenateModules: true,
        runtimeChunk: 'single',
        emitOnErrors: false,
        checkWasmTypes: true,
        realContentHash: true,
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
