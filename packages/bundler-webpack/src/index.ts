import { IBundler } from '@mdfjs/core';
import webpack, { Configuration } from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import getServerOpts from './options/server';
import getChain from './compiler/chain';

/**
 * @file 使用 webpack 构建
 */

type IOpts = {
  changeUserConfig: Function;
  changeWebpackConfig: Function;
  changeBundleConfig: Function;
};

export default class BundlerWebpack implements IBundler {
  config: Configuration = {};
  bundleImpl: typeof webpack = webpack;
  userConfig: any;

  constructor(userConfig: any) {
    this.userConfig = userConfig;
  }

  /**
   * 通过用户配置 + 插件配置，生成 webpack 配置
   */
  generateConfig(opts: IOpts) {
    const userConfig = (this.userConfig = opts.changeUserConfig(this.userConfig));
    const chain = getChain(userConfig);

    opts.changeWebpackConfig(chain);

    // 用户的修改优先级最高
    if (userConfig.chainWebpack) {
      userConfig.chainWebpack(chain);
    }

    this.config = opts.changeBundleConfig(chain.toConfig());
  }

  build() {
    const bundleImpl = this.bundleImpl;
    const config = this.config;

    return new Promise((resolve, reject) => {
      const compiler = bundleImpl(config);

      compiler.run((err, stats: any) => {
        if (err || stats.hasErrors()) {
          try {
            console.log(stats.toString('errors-only'));
          } catch (e) {}
          return reject(new Error('build failed'));
        }

        resolve({ stats });
      });
    });
  }

  /**
   * 启动本地构建模式
   */
  setupDev(isComplex?: boolean) {
    const bundleImpl = this.bundleImpl;
    const serverOpts = getServerOpts(this.userConfig);
    const webpackCompiler = bundleImpl(this.config);
    let devMiddleware;

    if (isComplex) {
      devMiddleware = webpackDevMiddleware(webpackCompiler, {
        publicPath: '/',
        headers: { 'access-control-allow-origin': '*' },
      });
    }

    return {
      webpackCompiler,
      devMiddleware,
      serverOpts,
    };
  }

  print(data: Object) {
    console.dir(data, { depth: 3 });
  }
}
