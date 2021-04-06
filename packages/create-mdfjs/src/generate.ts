import { chalkPrints, globFind } from '@mdfjs/utils';
import mkdirp from 'mkdirp';
import Mustache from 'mustache';
import { dirname, join } from 'path';
import { statSync, copyFileSync, readFileSync, writeFileSync } from 'fs';

/**
 * @file 复制 app 模板
 */

interface IContext {
  template: string;
  version: string;
  prettierOpts: string;
  createPath: string;
}

export default function copyAndRenderFiles(context: IContext) {
  const sourceDir = join(__dirname, `../templates/${context.template}`);
  const files = globFind('**/*', { cwd: sourceDir, dot: true, ignore: ['**/node_modules/**'] });
  const appRoot = genAppRoot(context.createPath);

  files.forEach((file: string) => {
    const filePath = join(sourceDir, file);
    if (statSync(filePath).isDirectory()) {
      return;
    }

    // 规定模板全部以 .tpl 为后缀
    if (file.endsWith('.tpl')) {
      chalkPrints([['write: ', 'magenta'], file.replace(/\.tpl$/, '')]);
      const targetPath = join(appRoot, file.replace(/\.tpl$/, ''));

      renderTpl({
        path: filePath,
        target: targetPath,
        data: context,
      });
    } else {
      chalkPrints([['copy: ', 'green'], file]);
      const targetPath = join(appRoot, file);

      mkdirp.sync(dirname(targetPath));
      copyFileSync(filePath, targetPath);
    }
  });
}

function renderTpl(opts: { path: string; data: object; target: string }) {
  const tpl = readFileSync(opts.path, 'utf-8');
  const content = Mustache.render(tpl, opts.data);

  mkdirp.sync(dirname(opts.target));
  writeFileSync(opts.target, content, 'utf-8');
}

/**
 * 项目创建的路径
 */
function genAppRoot(path: string) {
  if (path.startsWith('/')) {
    return path;
  } else {
    return join(process.cwd(), path);
  }
}
