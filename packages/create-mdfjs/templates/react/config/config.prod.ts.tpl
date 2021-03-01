import { defineConfig } from 'mdf';

/**
 * @file 生产环境配置文件
 */

export default defineConfig({
  history: {
    type: 'hash',
    getUserConfirmation: './qy.history',
  },

  // 异常收集
  sentry: {
    enable: false,
    // dsn配置,
    dsn: 'https://2c4f83282da6474a8ad49097f1842991@sentry-int.medlinker.com/24',
    // 路径
    urlPrefix: [''],
  },
});
