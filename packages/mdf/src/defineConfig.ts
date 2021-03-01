import { IConfig } from '@mdfjs/types';
// @ts-ignore
import { IConfigPlugins } from '@@/plugins/pluginConfig';

/**
 * @file define config
 */

export default function defineConfig(config: IConfigPlugins | IConfig) {
  return config;
}