import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import loadToast from './plugins/loadToast';

/**
 * @file 项目配置
 */

export default {
  // config 只覆盖应用插件
  beforeRender(config: any, app: any) {
    app.use(loadToast);
    console.log(`应用插件配置【${process.env.PRO_NAME}】`, config);

    Sentry.init({
      dsn: config.sentry.dsn,
      environment: 'dev',
      // @ts-ignore
      integrations: [new Integrations.Vue({ app, attachProps: true })],
    });

    app.router.beforeEach(function (to, from, next) {
      console.log('全局守卫');
      next();
    });
  },
};
