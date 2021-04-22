#!/usr/bin/env node

/**
 * @file 启动
 */

const Program = require('commander');
const cli = require('../lib/cli').default;

Program.version(require('../package.json').version);

Program.command('build')
  .description('build project')
  .option('--node', 'node project')
  .action(opts => cli('build', opts));

Program.command('dev')
  .option('--node', 'node project')
  .description('dev project')
  .action(opts => cli('dev', opts));

Program.command('info')
  .description('get mdf infomation')
  .action(opts => cli('info', opts));

Program.command('config')
  .description('get project config')
  .action(opts => cli('config', opts));

Program.command('lint')
  .description('project lint & prettier')
  .option('--es', 'es lint')
  .option('--css', 'css lint')
  .option('--sass', 'sass lint')
  .option('--less', 'less lint')
  .action(opts => cli('lint', opts));

Program.parse(process.argv);
