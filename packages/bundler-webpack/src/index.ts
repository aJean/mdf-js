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
   * 用户配置 + 插件配置 -> webpack 配置
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
      try {
        const compiler = bundleImpl(config);

        compiler.run((err, stats: any) => {
          if (err || stats.hasErrors()) {
            console.log(stats.toString('errors-only'));
            return reject(new Error('build failed'));
          }

          compiler.close(() => resolve({ stats }));
        });
      } catch (e: any) {
        return reject(new Error(e.toString('errors-only')));
      }
    });
  }

  /**
   * 启动本地构建模式
   */
  setupDev(isComplex?: boolean) {
    const bundleImpl = this.bundleImpl;
    const opts = getServerOpts(this.userConfig);
    const compiler = bundleImpl(this.config);
    let devMiddleware;

    if (isComplex) {
      devMiddleware = webpackDevMiddleware(compiler as any, {
        publicPath: '/',
        headers: { 'access-control-allow-origin': '*' },
      });
    }

    return {
      compiler,
      devMiddleware,
      opts,
    };
  }

  print(data: Object) {
    console.dir(data, { depth: 3 });
  }
}
