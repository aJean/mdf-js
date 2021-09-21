import React from 'react';
import Wrapper from '@/components/wrapper';

/**
 * @file 应用层框架配置
 */

export default {
  // 这里的 args 只覆盖应用插件 config
  beforeRender(...args: any) {
    console.log('[内部插件]', args);
  },

  // wrap render function
  render(oldRender: Function) {
    oldRender();
  },

  // add parent react root element
  appElement(Child: React.Component) {
    return React.createElement(Wrapper, null, Child);
  },

  // config app
  appOpts(opts: any) {
    opts.onError = function (e: any) {
      alert(e.message);
      e.preventDefault();
    };

    return opts;
  },
};
