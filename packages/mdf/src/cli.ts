import updater from 'update-notifier';
import { Service } from '@mdfjs/core';
import { chalkPrint } from '@mdfjs/utils';
import startFork from './fork';
import getPresets from './presets';

/**
 * @file cli 命令分配
 */

export default function (name: string, opts: any) {
  // 检查版本更新
  try {
    const path = require.resolve('../package.json');
    const notifier = updater({
      pkg: require(path),
      updateCheckInterval: 1000 * 60 * 60 * 24, // 1 day
      shouldNotifyInNpmScript: true,
    });

    if (notifier.update) {
      return notifier.notify();
    }
  } catch (e) {}

  const args = {
    node: opts.node,
    es: opts.es,
    css: opts.css,
    scss: opts.scss,
    less: opts.less,
    files: opts.files,
  };

  process.env.mdfArgs = JSON.stringify(args);
  let service;

  switch (name) {
    case 'dev':
      const child = startFork(require.resolve('./childService'));

      process.on('message', function (msg: string) {
        chalkPrint(`from child process: ${msg}`, 'grey');
      });
      process.on('SIGINT', () => child.kill('SIGINT'));
      process.on('SIGTERM', () => child.kill('SIGTERM'));
      break;
    case 'build':
      service = new Service(getPresets());
      service.runCommand(name, args);
      break;
    default:
      service = new Service(getPresets(true));
      service.runCommand(name, opts);
  }
}
