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
    framework: 'dva'
  },

  history: {
    type: 'hash',
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
    enable: true,
  },

  // 统计
  growingio: {
    enable: MDF_ENV === 'prod',
    // growingio 的 key
    key: 'ad6251cfbfcc4d7c',
    // 是否启用 hash 路由
    hashtag: true,
    // debug 模式
    debug: false,
  },

  // @todo pwa
  serviceWorker: {
    enable: false,
  },

  // @todo 启动屏
  splash: {
    enable: false,
    autoClose: true,
    style: '',
    img: {
      src: '/logo.png',
      width: '50%',
    },
  },
});
