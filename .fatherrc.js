/**
 * @file fatther-build 配置
 */

const all = [
  'records',
  'core',
  'utils',
  'runtime',
  'server',
  'bundler-webpack',
  'create-mdfjs',
  'plugins',
  'plugins-lint',
  'plugins-web',
  'mdf',
];

let pkgs = process.env.pkgs;

if (pkgs) {
  pkgs = JSON.parse(pkgs);
}

export default {
  target: 'node',
  pkgs: pkgs || all,
  cjs: 'babel',
};
