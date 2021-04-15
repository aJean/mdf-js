"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = initSentry;

var _path = require("path");

var _webpackPlugin = _interopRequireDefault(require("@sentry/webpack-plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @file sentry webpack
 */
function initSentry(api, sentry) {
  api.chainWebpack(chain => {
    chain.plugin('sentry').use(_webpackPlugin.default, [{
      release: sentry.release,
      include: chain.output.get('path'),
      ignoreFile: '.gitignore',
      stripPrefix: sentry.stripPrefix || [(0, _path.dirname)(chain.output.get('path'))],
      org: sentry.org,
      project: sentry.project,
      url: 'http://sentry.ai101test.com',
      authToken: '62dacdc8c5244e41bc322fde4907059c85704b724dd84c3cbf7aa39da2c34d83',
      cleanArtifacts: true,
      rewrite: true
    }]);
  });
}