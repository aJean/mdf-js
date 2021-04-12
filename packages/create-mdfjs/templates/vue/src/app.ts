import loadToast from './plugins/loadToast';

/**
 * @file 项目配置
 */

export default {
  // config 只覆盖应用插件
  beforeRender(config: any, app: any) {
    app.use(loadToast);
    console.log(`应用插件配置【${process.env.PRO_NAME}】`, config);
  },
};
