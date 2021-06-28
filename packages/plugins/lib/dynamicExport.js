"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

/**
 * @file 模块动态导出, export by packages/mdf
 */
function generateExports(item) {
  if (item.all) {
    return `export * from '${item.source}';`;
  } else if (item.specifiers) {
    return `export { ${item.specifiers.join(', ')} } from '${item.source}';`;
  } else {
    return '';
  }
}

function _default(api) {
  const paths = api.paths,
        PluginType = api.PluginType;
  api.onCodeGenerate({
    name: 'genExport',

    last() {
      // api.addRuntimeExports 不能在 last 中执行
      const runtimeExports = api.invokePlugin({
        key: 'addRuntimeExports',
        type: PluginType.add
      });
      const data = runtimeExports.map(item => generateExports(item)).join('\n') + `\n`;
      api.writeFile(`${paths.absTmpPath}/moduleExports.ts`, data);
    }

  });
}