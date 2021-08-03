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
    uselog: false,
    timeout: 300000,
  },

  publicPath: '/',
});
