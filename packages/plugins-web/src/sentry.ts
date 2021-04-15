import { IApi } from '@mdfjs/types';
import { dirname } from 'path';
import SentryWebpackPlugin from '@sentry/webpack-plugin';

/**
 * @file sentry webpack
 */

export default function initSentry(api: IApi, sentry: any) {
  api.chainWebpack((chain) => {
    chain.plugin('sentry').use(SentryWebpackPlugin, [
      {
        release: sentry.release,
        include: chain.output.get('path'),
        ignoreFile: '.gitignore',
        stripPrefix: sentry.stripPrefix || [dirname(chain.output.get('path'))],
        org: sentry.org,
        project: sentry.project,
        url: 'http://sentry.ai101test.com',
        authToken: '62dacdc8c5244e41bc322fde4907059c85704b724dd84c3cbf7aa39da2c34d83',
        cleanArtifacts: true,
        rewrite: true,
      },
    ]);
  });
}
