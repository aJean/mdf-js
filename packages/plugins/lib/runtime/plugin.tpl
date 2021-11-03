import { Plugin } from '{{{ runtimePath }}}';

/**
 * @file runtime common plugins
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

export { plugin };

// plugin describe config
export const config = {{{ config }}};