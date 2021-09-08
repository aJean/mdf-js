"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @file eslint options
 */
var _default = {
  root: true,
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    // typescript-eslint specific options
    warnOnUnsupportedTypeScriptVersion: true
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true
  },
  plugins: ['@typescript-eslint', 'eslint-plugin-import'],
  settings: {},
  rules: {
    // http://eslint.org/docs/rules/
    semi: ['error', 'always'],
    'array-callback-return': 'warn',
    'default-case': 'off',
    'no-dupe-class-members': 'off',
    'no-undef': 'off',
    '@typescript-eslint/consistent-type-assertions': 'warn',
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': 'warn',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['warn', {
      functions: false,
      classes: false,
      variables: false,
      typedefs: false
    }],
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': ['error', {
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true
    }],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', {
      args: 'none',
      ignoreRestSiblings: true
    }],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'warn',
    'dot-location': ['warn', 'property'],
    eqeqeq: ['warn', 'smart'],
    'new-parens': 'warn',
    'no-caller': 'warn',
    'no-cond-assign': ['warn', 'except-parens'],
    'no-const-assign': 'warn',
    'no-control-regex': 'warn',
    'no-delete-var': 'warn',
    'no-dupe-args': 'warn',
    'no-dupe-keys': 'warn',
    'no-duplicate-case': 'warn',
    'no-empty-character-class': 'warn',
    'no-empty-pattern': 'warn',
    'no-eval': 'warn',
    'no-ex-assign': 'warn',
    'no-extend-native': 'warn',
    'no-extra-bind': 'warn',
    'no-extra-label': 'warn',
    'no-fallthrough': 'warn',
    'no-func-assign': 'warn',
    'no-implied-eval': 'warn',
    'no-invalid-regexp': 'warn',
    'no-iterator': 'warn',
    'no-label-var': 'warn',
    'no-labels': ['warn', {
      allowLoop: true,
      allowSwitch: false
    }],
    'no-lone-blocks': 'warn',
    'no-loop-func': 'warn',
    'no-mixed-operators': ['warn', {
      groups: [['&', '|', '^', '~', '<<', '>>', '>>>'], ['==', '!=', '===', '!==', '>', '>=', '<', '<='], ['&&', '||'], ['in', 'instanceof']],
      allowSamePrecedence: false
    }],
    'no-multi-str': 'warn',
    'no-native-reassign': 'warn',
    'no-negated-in-lhs': 'warn',
    'no-new-func': 'warn',
    'no-new-object': 'warn',
    'no-new-symbol': 'warn',
    'no-new-wrappers': 'warn',
    'no-obj-calls': 'warn',
    'no-octal': 'warn',
    'no-octal-escape': 'warn',
    // TODO: Remove this option in the next major release of CRA.
    // https://eslint.org/docs/user-guide/migrating-to-6.0.0#-the-no-redeclare-rule-is-now-more-strict-by-default
    'no-redeclare': ['warn', {
      builtinGlobals: false
    }],
    'no-regex-spaces': 'warn',
    'no-restricted-syntax': ['warn', 'WithStatement'],
    'no-script-url': 'warn',
    'no-self-assign': 'warn',
    'no-self-compare': 'warn',
    'no-sequences': 'warn',
    'no-shadow-restricted-names': 'warn',
    'no-sparse-arrays': 'warn',
    'no-template-curly-in-string': 'warn',
    'no-this-before-super': 'warn',
    'no-throw-literal': 'warn',
    // 'no-restricted-globals': ['error'].concat(restrictedGlobals),
    'no-unreachable': 'warn',
    'no-unused-labels': 'warn',
    'no-useless-computed-key': 'warn',
    'no-useless-concat': 'warn',
    'no-useless-escape': 'warn',
    'no-useless-rename': ['warn', {
      ignoreDestructuring: false,
      ignoreImport: false,
      ignoreExport: false
    }],
    'no-with': 'warn',
    'no-whitespace-before-property': 'warn',
    'require-yield': 'warn',
    'rest-spread-spacing': ['warn', 'never'],
    strict: ['warn', 'never'],
    'unicode-bom': ['warn', 'never'],
    'use-isnan': 'warn',
    'valid-typeof': 'warn',
    'getter-return': 'warn',
    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
    'import/first': 'error',
    'import/no-amd': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/order': ['error'],
    quotes: ['error', 'single', {
      allowTemplateLiterals: true
    }]
  }
};
exports.default = _default;