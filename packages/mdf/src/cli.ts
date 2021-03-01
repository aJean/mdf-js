import { Service } from '@mdfjs/core';
import { errorPrint, chalkPrint } from '@mdfjs/utils';
import startFork from './fork';
import getPresets from './presets';

/**
 * @file cli 命令分配
 *      【约定参数】都是boolean 类型 => yarn dev --node
 *      【非约定参数】只取第一个值 => yarn lint ./global.less
 */

export default function(name: string, opts: any) {
  const args = {
    node: opts.node,
    es: opts.es,
    css: opts.css,
    sass: opts.sass,
    less: opts.less,
    files: opts.args[0],
  };
  
  process.env.mdfArgs = JSON.stringify(args);
  let service;

  try {
    switch (name) {
      case 'dev':
        const child = startFork(require.resolve('./childService'));

        process.on('message', function(msg: string) {
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
        service.runCommand(name, args);
    }
  } catch (e) {
    errorPrint(e);
    process.exit(1);
  }
}
