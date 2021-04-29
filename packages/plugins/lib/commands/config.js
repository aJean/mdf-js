"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _core = require("@mdfjs/core");

var _consoleTablePrinter = require("console-table-printer");

/**
 * @file 读取户配置，在开发时可以用来做配置检查
 */
function _default(api) {
  api.registerCommand({
    name: 'config',

    fn() {
      console.log('------------------------ user config ------------------------');
      toTable((0, _core.getUserConfig)()).printTable();
      console.log('------------------------ last config ------------------------');
      toTable(api.getConfig()).printTable();
    }

  });
}

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