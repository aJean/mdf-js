import { Plugin } from '{{{ runtimePath }}}';

/**
 * @file 运行时插件注册
 */

const plugin = new Plugin({
  validKeys: [{{#validKeys}}'{{{ . }}}',{{/validKeys}}],
});

{{#plugins}}
plugin.register({
  exports: require('{{{ . }}}'),
  path: '{{{ . }}}',
});
{{/plugins}}

// app 增强配置
{{#projectPlugin}}
plugin.registerPlugin(require('{{{ path }}}').default);
{{/projectPlugin}}

export { plugin };

// plugin describe config
export const config = {{{ config }}};