import { IApi, ExportsType } from '@mdfjs/types';

/**
 * @file 模块动态导出, export by packages/mdf
 */

function generateExports(item: ExportsType) {
  if (item.all) {
    return `export * from '${item.source}';`;
  } else if (item.specifiers) {
    return `export { ${item.specifiers.join(', ')} } from '${item.source}';`;
  } else {
    return '';
  }
}

export default function (api: IApi) {
  const { paths, PluginType } = api;

  api.onCodeGenerate({
    name: 'genExport',
    last() {
      // api.addRuntimeExports 不能在 last 中执行
      const runtimeExports = api.invokePlugin({
        key: 'addRuntimeExports',
        type: PluginType.add,
      });

      const data = runtimeExports.map((item: any) => generateExports(item)).join('\n') + `\n`;
      api.writeFile(`${paths.absTmpPath}/moduleExports.ts`, data);
    },
  });
}
