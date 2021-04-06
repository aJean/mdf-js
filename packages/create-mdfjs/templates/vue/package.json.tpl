{
  "name": "mdf-vue-project",
  "version": "0.0.0",
  "description": "{{{ description }}}",
  "main": "index.js",
  "scripts": {
    "_mdf": "./node_modules/mdfjs/packages/mdf/bin/bootstrap.js",
    "build": "MDF_ENV=prod yarn mdf build",
    "dev": "MDF_ENV=dev yarn mdf dev vue",
    "react": "yarn mdf create"
  },
  "gitHooks": {
    "pre-commit": "lint-staged"
  },
  "lint-staged": {
    "*.{ts,tsx}": ["yarn mdf lint --es"],
    "*.css": ["yarn mdf lint --css"],
    "*.scss": ["yarn mdf lint --sass"],
    "*.less": ["yarn mdf lint --less"]
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/aJean/mdf-demo.git"
  },
  "dependencies": {
    "@mdfjs/vue": "{{{ @mdfjs/vue }}}",
    "mdfjs": "{{{ mdfjs }}}",
    "element3": "^0.0.35",
    "typescript": "^4.1.3",
    "vue": "^3.0.4",
    "vue-router": "^4.0.1"
  },
  "devDependencies": {
    "@types/node": "14.14.7",
    "@types/core-js": "2.5.4",
    "@types/regenerator-runtime": "0.13.0",
    "@commitlint/cli": "^11.0.0",
    "@commitlint/config-conventional": "^11.0.0",
    "core-js": "3.7.0",
    "regenerator-runtime": "0.13.7",
    "husky": "^4.2.3",
    "lint-staged": "^10.0.9"
  },
  "author": "{{{ author }}}",
  "license": "MIT"
}