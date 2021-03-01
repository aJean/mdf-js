import React from 'react';
import Wrapper from '@/components/wrapper';

/**
 * @file 应用配置，并非入口文件
 */

export default {
  // config 只覆盖应用插件
  beforeRender(...args: any) {
    console.log('参数：', args);
  },

  // wrap render function
  // render(oldRender: Function) {
  //   oldRender();
  // },

  // add parent react root element
  appElement(Child: React.Component) {
    return React.createElement(Wrapper, null, Child);
  },

  // config fundamental app
  appOpts(opts: any) {
    opts.isStore = true;
    return opts;
  },
};
