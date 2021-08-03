{
  "name": "mdf-vue-project",
  "version": "0.0.0",
  "description": "{{{ description }}}",
  "main": "index.js",
  "scripts": {
    "_mdf": "./node_modules/mdfjs/packages/mdf/bin/bootstrap.js",
    "dev": "MDF_ENV=dev mdf dev",
    "build": "MDF_ENV=prod mdf build",
    "lint": "mdf lint",
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{ts,tsx}": "mdf lint --es",
    "*.css": "mdf lint --css",
    "*.scss": "mdf lint --scss",
    "*.less": "mdf lint --less"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/aJean/mdf-demo.git"
  },
  "dependencies": {
    "@mdfjs/vue": "{{{ @mdfjs/vue }}}",
    "mdfjs": "{{{ mdfjs }}}",
    "element3": "^0.0.35",
    "vue": "3.0.11",
    "vue-router": "4.0.6"
  },
  "devDependencies": {
    "@types/node": "14.14.7",
    "@types/core-js": "2.5.4",
    "@types/regenerator-runtime": "0.13.0",
    "@commitlint/cli": "^11.0.0",
    "@commitlint/config-conventional": "^11.0.0",
    "core-js": "3.7.0",
    "regenerator-runtime": "0.13.7",
    "husky": "^7.0.1",
    "lint-staged": "^11.0.1"
  },
  "author": "{{{ author }}}",
  "license": "MIT"
}