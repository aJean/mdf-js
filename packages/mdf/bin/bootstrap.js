#!/usr/bin/env node

/**
 * @file 启动
 */

const { Command } = require('commander');
const { errorPrint } = require('@mdfjs/utils');
const cli = require('../lib/cli').default;

// 内部 _exit 逻辑
Command.prototype._exit = function (exitCode, code, message) {
  if (this._exitCallback) {
    this._exitCallback(new CommanderError(exitCode, code, message));
  }
  process.exit(0);
};
const program = new Command();

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

  program.parse(process.argv);
} catch (e) {}
