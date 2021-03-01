import VConsole from 'vconsole';

/**
 * @file 集成 vconsole
 */

export function beforeRender() {
  new VConsole();
}