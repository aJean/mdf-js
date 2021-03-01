import Chain from 'webpack-chain';
import WebpackBar from 'webpackbar';

/**
 * @file 默认配置
 */

const chain = new Chain();
chain.mode('development').devtool(false);

chain.module
  .rule('ts')
  .test(/\.(ts|tsx|js)?/)
  .exclude.add(/dist|node_modules/)
  .end()
  .use('tsloader')
  .loader('babel-loader')
  .options({
    presets: ['@babel/preset-typescript', '@babel/preset-env'],
    plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties'],
  });

chain.output.filename('[name].js');

chain.plugin('progress').use(WebpackBar);

chain.stats({
  assets: true,
  modules: false,
  timings: true,
});

chain.resolve.extensions.merge(['.tsx', '.ts', '.js']);

export default chain;
