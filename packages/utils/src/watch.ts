import chokidar from 'chokidar';
import { statSync } from 'fs';
import { chalkPrint, errorPrint } from './utils';

/**
 * @file 监控文件目录
 */

export type IWatchOpts = {
  path: string;
  keys?: string[];
  useMemo?: boolean;
  onChange: (type: string, path: string) => void;
};

const InternalEvents = ['add', 'unlink', 'addDir', 'unlinkDir', 'change'];
export function watch(opts: IWatchOpts) {
  const { path, keys, useMemo, onChange } = opts;
  const sizeMemo = {};

  let watcher: any;

  // 避免开发者在 build 时候误用 watch
  if (process.env.MDF_ENV === 'prod') {
    return;
  }

  try {
    const state = statSync(path);
    const events = keys && keys.length ? keys : InternalEvents;

    watcher = chokidar.watch(path, { ignoreInitial: true });
    // 目录监听多种行为
    if (state.isDirectory()) {
      events.forEach((event) => {
        watcher.on(event, function (path: string, data: any) {
          // data 一直是 undeinfed ?
          if (data && useMemo) {
            if (sizeMemo[path] == data.size) {
              return;
            }

            sizeMemo[path] = data.size;
          }

          onChange(event, path);
        });
      });
    } else if (state.isFile()) {
      // 文件只监听改变
      watcher.on('change', function (path: string) {
        onChange('change', path);
      });
    }
  } catch (e) {
    errorPrint(e);
    process.exit(1);
  }

  return function () {
    watcher ? watcher.close() : chalkPrint(`${path} not watched`, 'red');
  };
}
