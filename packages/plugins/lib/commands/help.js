"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _core = require("@mdfjs/core");

var _utils = require("@mdfjs/utils");

var _boxen = _interopRequireWildcard(require("boxen"));

var _consoleTablePrinter = require("console-table-printer");

var _child_process = require("child_process");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _default(api) {
  api.registerCommand({
    name: 'help',

    fn(opts) {
      if (opts.config) {
        doConfig(api);
      } else if (opts.tag) {
        doTags();
      } else {
        doInfo(api);
      }
    }

  });
}
/**
 * mdf 框架信息
 */


function doInfo(api) {
  const _api$getConfig = api.getConfig(),
        MDF_VERSION = _api$getConfig.MDF_VERSION;

  const padding = {
    top: 1,
    left: 20,
    right: 20,
    bottom: 1
  };
  const data = (0, _boxen.default)(`mdf-js\nversion: ${MDF_VERSION}`, {
    padding,
    margin: 1,
    align: 'center',
    borderStyle: "classic"
    /* Classic */
    ,
    borderColor: 'cyan'
  });
  console.log(data);
}
/**
 * 用户配置
 */


function doConfig(api) {
  function toTable(data) {
    const table = new _consoleTablePrinter.Table({
      columns: [{
        name: 'index',
        alignment: 'left',
        color: 'cyan'
      }, {
        name: 'key',
        alignment: 'right',
        color: 'green'
      }, {
        name: 'value',
        alignment: 'left'
      }]
    });
    Object.keys(data).forEach((key, index) => {
      const value = data[key];
      table.addRow({
        index,
        key,
        value: JSON.stringify(value)
      }, {
        color: typeof value == 'object' ? '' : 'yellow'
      });
    });
    return table;
  }

  console.log('------------------------ user config ------------------------');
  toTable((0, _core.getUserConfig)()).printTable();
  console.log('------------------------ env config ------------------------');
  toTable(api.getConfig().envs).printTable();
}
/**
 * 同步 git tags
 */


function doTags() {
  try {
    (0, _child_process.execSync)('git tag -l | xargs git tag -d', {
      stdio: [0, 1, 2]
    });
    (0, _child_process.execSync)('git fetch origin --prune --tags', {
      stdio: [0, 1, 2]
    });
  } catch (e) {
    (0, _utils.errorPrint)(e);
  }
}