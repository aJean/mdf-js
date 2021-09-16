{
  "name": "mdf-react-project",
  "version": "1.0.0",
  "description": "{{{ description }}}",
  "scripts": {
    "_mdf": "./node_modules/mdfjs/packages/mdf/bin/bootstrap.js",
    "dev": "MDF_ENV=dev mdf dev",
    "build": "MDF_ENV=prod mdf build",
    "build:qa": "MDF_ENV=qa mdf build",
    "lint": "mdf lint",
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{ts,tsx}": "mdf lint --es",
    "*.css": "mdf lint --css",
    "*.scss": "mdf lint --scss",
    "*.less": "mdf lint --less"
  },
  "dependencies": {
    "@medlinker/fundamental": "^0.2.0",
    "@mdfjs/react": "{{{ @mdfjs/react }}}",
    "mdfjs": "{{{ mdfjs }}}",
    "react": "^17.0.1",
    "react-dom": "^17.0.1"
  },
  "devDependencies": {
    "@types/core-js": "2.5.4",
    "@types/node": "14.14.7",
    "@types/regenerator-runtime": "0.13.0",
    "@types/react": "^17.0.0",
    "@types/react-dom": "^17.0.0",
    "@commitlint/cli": "^11.0.0",
    "@commitlint/config-conventional": "^11.0.0",
    "core-js": "3.7.0",
    "husky": "^7.0.1",
    "lint-staged": "^11.0.1",
    "regenerator-runtime": "0.13.7"
  },
  "author": "{{{ author }}}",
  "license": "MIT"
}
