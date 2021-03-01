import webpack from 'webpack';
import path from 'path';
import config from './config';

/**
 * @file lerna 项目构建，怎样才能无视依赖顺序
 */

const cwd = process.cwd();
const pkgs = [`${cwd}/packages/mdf`];

pkgs.forEach((pkg) => {
  config.entry('mdf').add(`${pkg}/index.ts`);
  config.output.path(path.resolve(pkg, 'dist'))

  const compiler = webpack(config.toConfig());

  compiler.run((err, stat) => {
    console.log('########################');
    console.log(config['entry']);

    if (err || stat!.hasErrors()) {
      console.log(err);
    }
  });
});
