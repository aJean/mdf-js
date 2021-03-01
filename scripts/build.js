#!/usr/bin/env node

const yParser = require('yargs-parser');
const args = yParser(process.argv.slice(2));

// Notify update when process exits
const updater = require('update-notifier');
const pkg = require('father-build/package.json');
const { exit } = require('process');
updater({ pkg }).notify({ defer: true });

// 交给配置文件去处理
if (args._.length) {
  process.env.pkgs = JSON.stringify(args._);
}

function build() {
  const buildArgs = {
    entry: undefined,
  };

  require('father-build/lib/build')
    .default({
      cwd: args.root || process.cwd(),
      watch: args.w || args.watch,
      buildArgs,
    })
    .catch(e => {
      console.log(e);
      process.exit(1);
    });
}

build();
