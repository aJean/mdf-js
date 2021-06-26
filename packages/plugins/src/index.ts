/**
 * @file 内部插件集
 *       顺序不可变否则收集的信息不完整: runtime、export、defineConfig
 */

export default function() {
  return {
    presets: [
      require.resolve('./commands/build'),
      require.resolve('./commands/dev'),
      require.resolve('./commands/config'),
      require.resolve('./commands/info'),
      require.resolve('./runtime/polyfill'),
      require.resolve('./runtime/plugin'),
      require.resolve('./runtime/style'),
      require.resolve('./dynamicExport'),
      require.resolve('./pluginConfig'),
    ],
  };
}
