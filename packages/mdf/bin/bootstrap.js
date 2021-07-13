#!/usr/bin/env node

/**
 * @file 启动
 */

const program = require('commander');
const { errorPrint } = require('@mdfjs/utils');
const cli = require('../lib/cli').default;

// program.version('use mdf -i instead', '-v, --version');

program
  .option('-i, --info', 'get mdf info')
  .option('-c, --config', 'get project configs')
  .option('-t, --tag', 'sync git tags')
  .description('welcome to mdf cli')
  .action((params) => cli('help', params));

program
  .command('build')
  .description('project build')
  .option('--node', 'node project')
  .action((params) => cli('build', params));

program
  .command('dev')
  .option('--node', 'node project')
  .description('project run')
  .action((params) => cli('dev', params));

program
  .command('lint [files...]')
  .description('project lint & prettier')
  .option('--es', 'es lint')
  .option('--css', 'css lint')
  .option('--scss', 'sass lint')
  .option('--less', 'less lint')
  .action((files, params) => cli('lint', { ...params, files }));

try {
  program.configureOutput({
    outputError: (str, write) => write(`\x1b[31m${str}\x1b[0m`),
  });

  program.exitOverride();
  program.parse(process.argv);
} catch (e) {}
