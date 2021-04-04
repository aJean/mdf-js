import { defineConfig } from 'mdf';

/**
 * @file 用户配置文件
 */

export default defineConfig({
  history: {
    type: 'hash',
  },

  publicPath: '/',

  // 工程配置
  project: {
    type: 'web',
    framework: 'vuex',
  },

  devServer: {
    port: 3000,
  },

  // 工作服务器以及需要加载的中间件
  workServer: {
    proxy: true,
  },
});
