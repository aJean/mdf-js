import { IApi } from '@mdfjs/types';
import { errorPrint, getUserPkg } from '@mdfjs/utils';
import { ESLint } from 'eslint';
import { base, vue } from './eslintConfig';

/**
 * @file eslint
 */
export default function (api: IApi, files: any) {
  const { cwd } = api;

  // 加载必要的 work plugin
  let config = base;
  const deps = getUserPkg(cwd, 'dependencies');
  ['@mdfjs/vue', '@mdfjs/react', '@mdfjs/node'].forEach((name: string) => {
    if (deps[name] !== undefined) {
      try {
        const plugin: any = require(`${cwd}/node_modules/${name}`);
        // 切换 vue 配置
        name == '@mdfjs/vue' && (config = vue);
        // 工程模块定制配置
        plugin.lint && (config = plugin.lint(config));
      } catch (e: any) {
        errorPrint({ name: 'error', message: e.message });
      }
    }
  });

  // @ts-ignore 使用 cwd 从当前目录查找 plugins
  const eslint = new ESLint({ cwd: __dirname, overrideConfig: config });

  Promise.all([eslint.lintFiles(files), eslint.loadFormatter('stylish')]).then((res) => {
    const list = res[0];
    const formatter = res[1];

    console.log(formatter.format(list));
    if (list.some((data) => data.errorCount)) {
      // 等待 stdout flush
      process.exitCode = 1;
    }
  });
}
