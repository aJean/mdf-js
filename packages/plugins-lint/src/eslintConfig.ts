/**
 * @file eslint options
 */

const base = {
  root: true,
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    // typescript-eslint specific options
    warnOnUnsupportedTypeScriptVersion: true,
  },
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'eslint-plugin-import'],
  settings: {},
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    semi: ['error', 'always'],
    strict: ['warn', 'never'],
    eqeqeq: ['warn', 'smart'],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],

    // https://github.com/typescript-eslint/typescript-eslint/tree/master/docs/getting-started
    '@typescript-eslint/no-explicit-any': 'off',
    // promise 参数、await、异常处理等
    '@typescript-eslint/no-floating-promises': 'warn',
    // 运行参数 function
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',
    '@typescript-eslint/consistent-type-assertions': 'warn',
    // 关闭加运算符严格校验
    '@typescript-eslint/restrict-plus-operands': 'warn',
    // 给对象设置 any 属性
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    // 允许使用 ts 注释，但必须予以说明
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': 'allow-with-description',
        'ts-nocheck': 'allow-with-description',
        'ts-check': 'allow-with-description',
      },
    ],
    // any 属性访问
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-array-constructor': 'warn',
    '@typescript-eslint/no-use-before-define': [
      'warn',
      {
        functions: false,
        classes: false,
        variables: false,
        typedefs: false,
      },
    ],
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    '@typescript-eslint/no-useless-constructor': 'warn',
    '@typescript-eslint/ban-types': [
      'warn',
      {
        types: { Function: '' },
      },
    ],
    // 字符串模板属性相关检查不需要了
    '@typescript-eslint/restrict-template-expressions': 'off',
    // http://eslint.org/docs/rules/
    'array-callback-return': 'warn',
    // switch need default
    'default-case': 'off',
    'no-dupe-class-members': 'error',
    // 未定义变量
    'no-undef': 'error',
    'no-array-constructor': 'off',
    'dot-location': ['warn', 'property'],
    'new-parens': 'warn',
    'no-caller': 'warn',
    'no-cond-assign': ['warn', 'except-parens'],
    'no-const-assign': 'error',
    'no-control-regex': 'warn',
    'no-delete-var': 'warn',
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty-character-class': 'warn',
    'no-empty-pattern': 'warn',
    'no-eval': 'warn',
    'no-iterator': 'warn',
    'no-label-var': 'warn',
    'no-labels': ['warn', { allowLoop: true, allowSwitch: false }],
    'no-lone-blocks': 'warn',
    'no-loop-func': 'warn',
    'no-mixed-operators': [
      'warn',
      {
        groups: [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: false,
      },
    ],
    'no-multi-str': 'off',
    'no-native-reassign': 'off',
    'no-negated-in-lhs': 'off',
    'no-new-func': 'off',
    'no-new-object': 'off',
    'no-new-symbol': 'off',
    'no-new-wrappers': 'off',
    'no-obj-calls': 'off',
    'no-octal': 'off',
    'no-octal-escape': 'off',

    // TODO: Remove this option in the next major release of CRA.
    // https://eslint.org/docs/user-guide/migrating-to-6.0.0#-the-no-redeclare-rule-is-now-more-strict-by-default
    'no-redeclare': ['warn', { builtinGlobals: false }],
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

    // 'no-restricted-globals': ["error", "event", "fdescribe"], 全局变量
    'no-unreachable': 'warn',
    'no-unused-labels': 'warn',
    'no-useless-computed-key': 'warn',
    'no-useless-concat': 'warn',
    'no-useless-escape': 'warn',
    'no-useless-rename': [
      'warn',
      {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false,
      },
    ],
    'no-with': 'warn',
    'no-whitespace-before-property': 'warn',
    'require-yield': 'warn',
    'rest-spread-spacing': ['warn', 'never'],
    'unicode-bom': ['warn', 'never'],
    'use-isnan': 'warn',
    'valid-typeof': 'warn',
    'getter-return': 'warn',

    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
    'import/first': 'error',
    'import/no-amd': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/order': ['error'],
  },
};

// for vue project
const vue = Object.assign({}, base, {
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    project: ['./tsconfig.json'],
    ecmaVersion: 2020,
    sourceType: 'module',
    // typescript-eslint specific options
    warnOnUnsupportedTypeScriptVersion: true,
    extraFileExtensions: ['.vue'],
  },
  plugins: ['@typescript-eslint', 'eslint-plugin-import', 'vue'],
});

export { base, vue };
