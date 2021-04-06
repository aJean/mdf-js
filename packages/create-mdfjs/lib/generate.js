"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = copyAndRenderFiles;

var _utils = require("@mdfjs/utils");

var _mkdirp = _interopRequireDefault(require("mkdirp"));

var _mustache = _interopRequireDefault(require("mustache"));

var _path = require("path");

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function copyAndRenderFiles(context) {
  const sourceDir = (0, _path.join)(__dirname, `../templates/${context.template}`);
  const files = (0, _utils.globFind)('**/*', {
    cwd: sourceDir,
    dot: true,
    ignore: ['**/node_modules/**']
  });
  const appRoot = genAppRoot(context.createPath);
  files.forEach(file => {
    const filePath = (0, _path.join)(sourceDir, file);

    if ((0, _fs.statSync)(filePath).isDirectory()) {
      return;
    } // 规定模板全部以 .tpl 为后缀


    if (file.endsWith('.tpl')) {
      (0, _utils.chalkPrints)([['write: ', 'magenta'], file.replace(/\.tpl$/, '')]);
      const targetPath = (0, _path.join)(appRoot, file.replace(/\.tpl$/, ''));
      renderTpl({
        path: filePath,
        target: targetPath,
        data: context
      });
    } else {
      (0, _utils.chalkPrints)([['copy: ', 'green'], file]);
      const targetPath = (0, _path.join)(appRoot, file);

      _mkdirp.default.sync((0, _path.dirname)(targetPath));

      (0, _fs.copyFileSync)(filePath, targetPath);
    }
  });
}

function renderTpl(opts) {
  const tpl = (0, _fs.readFileSync)(opts.path, 'utf-8');

  const content = _mustache.default.render(tpl, opts.data);

  _mkdirp.default.sync((0, _path.dirname)(opts.target));

  (0, _fs.writeFileSync)(opts.target, content, 'utf-8');
}
/**
 * 项目创建的路径
 */


function genAppRoot(path) {
  if (path.startsWith('/')) {
    return path;
  } else {
    return (0, _path.join)(process.cwd(), path);
  }
}