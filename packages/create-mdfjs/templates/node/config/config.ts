import { defineConfig } from 'mdf';

/**
 * @file 用户配置文件
 */

export default defineConfig({
  defines: {
    APP_AUTHOR: 'qy',
  },

  project: {
    type: 'node',
    port: 4000,
  },

  node: {
    timeout: 60000,
  },

  history: {
    type: 'hash',
  },

  publicPath: '/',

  chainWebpack(chain: any) {},
});
