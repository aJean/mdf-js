import { dirname } from 'path';

/**
 * @file babel-js 的默认配置，不同框架的 bundler 可以覆盖
 */

export default function getBabelOpts(opts: any) {
  const presets = [];
  const plugins = [];

  if (opts.isTest) {
    presets.push([require('@babel/preset-env').default, { targets: { node: 'current' } }]);
  } else {
    // 使用 .browserslist
    presets.push([
      require.resolve('@babel/preset-env'),
      {
        useBuiltIns: 'entry',
        corejs: 3,
        modules: false, // 为 tree-shaking 保留 esmodule 的 import
      },
    ]);
  }

  presets.push([require.resolve('@babel/preset-typescript')]);

  // 默认配置 { corejs: false, helpers: true, regenerator: true }
  plugins.push([
    require.resolve('@babel/plugin-transform-runtime'),
    {
      version: require('@babel/runtime/package.json').version,
      absoluteRuntime: dirname(require.resolve('@babel/runtime/package.json')),
      useESModules: true,
    },
  ]);

  plugins.push([require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }]);
  plugins.push([require.resolve('@babel/plugin-proposal-class-properties'), { loose: true }]);
  plugins.push([require.resolve('@babel/plugin-proposal-private-methods'), { loose: true }]);
  plugins.push([require.resolve('@babel/plugin-proposal-private-property-in-object'), { loose: true }]);

  return { cacheDirectory: true, presets, plugins };
}
