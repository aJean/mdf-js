import { Service, PluginApi, IPaths, ExportsType, ICommand } from '@mdfjs/core';

/**
 * @file api types
 */

export interface IApi extends PluginApi {
  paths: IPaths;

  plugins: { [key: string]: Array<Function> } = {};

  runtimeKeys: string[];

  invokePlugin: typeof Service.prototype.invokePlugin;

  runCommand: typeof Service.prototype.runCommand;

  makeDir: (path: string) => void;

  isExist: (path: string) => boolean;

  writeFile: (path: string, data: string) => void;

  getFile: (path: string) => string | null;

  chalkPrint: (msg: string, color: string) => void;
}

export { ExportsType, ICommand };
