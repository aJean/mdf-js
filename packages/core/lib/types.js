"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PluginType = void 0;

/**
 * @file service types
 */
var PluginType;
exports.PluginType = PluginType;

(function (PluginType) {
  PluginType["add"] = "add";
  PluginType["modify"] = "modify";
  PluginType["event"] = "event";
  PluginType["compose"] = "compose";
  PluginType["flush"] = "flush";
})(PluginType || (exports.PluginType = PluginType = {}));