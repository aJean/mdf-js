import { IApi } from 'mdf';

/**
 * @file 开发者可以自己定义插件
 *       可以跟着项目一起迭代，等到功能成熟再入库
 */

export default function(api: IApi) {
  api.onCodeGenerate(() => {
    const { paths } = api;
    
    api.writeFile(`${paths.absTmpPath}/plugins/plugin.qy.ts`, '// 开发者插件随便写的');
  });
}