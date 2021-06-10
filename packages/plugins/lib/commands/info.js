"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _boxen = _interopRequireWildcard(require("boxen"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * @file 获取框架信息、文档地址、demo 等都可以在这里输出
 */
function _default(api) {
  api.registerCommand({
    name: 'info',

    fn() {
      const _api$getConfig = api.getConfig(),
            MDF_VERSION = _api$getConfig.MDF_VERSION;

      const data = (0, _boxen.default)(`mdf-js\nversion: ${MDF_VERSION}`, {
        padding: {
          top: 1,
          left: 20,
          right: 20,
          bottom: 1
        },
        margin: 1,
        align: 'center',
        borderStyle: "classic"
        /* Classic */
        ,
        borderColor: 'cyan'
      });
      console.log(data);
    }

  });
}