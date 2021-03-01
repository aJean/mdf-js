/**
 * @file 运行时 utils
 */

export function useGio() {
  const gio = window['gio'];

  if (!gio && document.readyState !== 'complete') {
    return new Promise(function(resolve) {
      window.addEventListener('load', () => resolve(window['gio']));
    });
  }

  return Promise.resolve(gio);
}

/**
 * 埋点 sdk
 */
export function useSdk() {}

/**
 * 监控 sdk
 */
export function useMonitor() {}