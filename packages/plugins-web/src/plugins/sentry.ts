import * as Sentry from '@sentry/browser';

/**
 * @file 集成 sentry
 */

export function beforeRender(config: any) {
  Sentry.init({
    dsn: config.dsn,
    release: `${process.env.PRO_NAME}-${process.env.PRO_VERSION}`,
    environment: process.env.MDF_ENV,
    // @ts-ignore
    beforeSend: function(n, e) {
      // @ts-ignore
      if (!(e && e.originalException && e.originalException.__CANCEL__)) return n;
    },
  });
}
