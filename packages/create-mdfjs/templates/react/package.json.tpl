{
  "name": "mdf-react-project",
  "version": "1.0.0",
  "description": "{{{ description }}}",
  "scripts": {
    "_mdf": "./node_modules/mdfjs/packages/mdf/bin/bootstrap.js",
    "dev": "MDF_ENV=dev mdf dev",
    "dev:prod": "MDF_ENV=prod mdf dev",
    "build": "MDF_ENV=prod mdf build",
    "build:rd": "MDF_ENV=rd mdf build",
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
    "@mdfjs/react": "{{{ @mdfjs/react }}}",
    "mdfjs": "{{{ mdfjs }}}"
  },
  "devDependencies": {
    "@types/core-js": "2.5.4",
    "@types/node": "^16.9.4",
    "@types/react": "^17.0.9",
    "@types/react-dom": "^16.9.9",
    "@types/regenerator-runtime": "0.13.0",
    "@commitlint/cli": "^11.0.0",
    "@commitlint/config-conventional": "^11.0.0",
    "core-js": "3.7.0",
    "husky": "^7.0.1",
    "lint-staged": "^11.1.2",
    "regenerator-runtime": "0.13.7"
  },
  "author": "{{{ author }}}",
  "license": "MIT"
}
