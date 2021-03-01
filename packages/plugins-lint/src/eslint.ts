import { ESLint } from 'eslint';
import opts from './eslintOpts';

/**
 * @file eslint
 */

export default function(files: any, cwd: string) {
  if (!files) {
    files = [`${cwd}/src/**/*.{ts,tsx}`];
  }

  // @ts-ignore 使用 cwd 从当前目录查找 plugins
  const eslint = new ESLint({ cwd: __dirname, overrideConfig: opts });
  Promise.all([
    eslint.lintFiles(files),
    eslint.loadFormatter('stylish'),
  ]).then(res => {
    const list = res[0];
    const formatter = res[1];

    console.log(formatter.format(list));
    if (list.some(data => data.errorCount)) {
      process.exit(1);
    }
  });
}
