{
  "name": "mdf-node",
  "version": "0.0.0",
  "description": "mdfjs node 开发模板",
  "main": "index.js",
  "scripts": {
    "_mdf": "./node_modules/mdfjs/packages/mdf/bin/bootstrap.js",
    "build": "MDF_ENV=prod yarn mdf build",
    "dev": "MDF_ENV=dev yarn mdf dev --node",
    "lint": "yarn mdf lint",
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{ts,tsx}": "mdf lint --es"
  },
  "repository": "https://github.com/aJean/mdf-demo.git",
  "author": "qy",
  "license": "MIT",
  "dependencies": {
    "@mdfjs/node": "{{{ @mdfjs/node }}}",
    "mdfjs": "{{{ mdfjs }}}",
    "reflect-metadata": "^0.1.13",
    "rxjs": "6.6.6"
  },
  "devDependencies": {
    "@commitlint/cli": "^12.0.1",
    "@commitlint/config-conventional": "^12.0.1",
    "@types/express": "^4.17.11",
    "@types/node": "^14.14.32",
    "husky": "^7.0.1",
    "lint-staged": "^11.0.1"
  }
}