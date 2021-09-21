import { defineConfig } from 'mdf';

/**
 * @file 用户配置文件
 */

const MDF_ENV = process.env.MDF_ENV;
export default defineConfig({
  defines: {
    APP_AUTHOR: 'qy',
  },

  // 工程配置
  project: {
    type: 'web',
    framework: 'rematch',
  },

  history: {
    type: 'browser',
  },

  publicPath: '/',

  devServer: {
    port: 3000,
  },

  // 工作服务器以及需要加载的中间件
  workServer: {
    proxy: true,
    ws: false,
    ui: false,
  },

  chainWebpack(chain: any) {},

  // 开发者插件
  plugins: ['./plugins/userPlugin.ts'],

  vconsole: {
    enable: false,
  },

  // 响应式方案
  rem: {
    enable: false,
  },

  sentry: {
    enable: false,
    dsn: 'https://2c4f83282da6474a8ad49097f1842991@sentry-int.mdf.com/11',
    org: 'sentry',
    project: 'xxx',
  },
});
