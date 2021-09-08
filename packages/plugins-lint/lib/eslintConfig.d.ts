/**
 * @file eslint options
 */
declare const _default: {
    root: boolean;
    parser: string;
    parserOptions: {
        parser: string;
        ecmaVersion: number;
        sourceType: string;
        ecmaFeatures: {
            jsx: boolean;
        };
        warnOnUnsupportedTypeScriptVersion: boolean;
    };
    env: {
        browser: boolean;
        commonjs: boolean;
        es6: boolean;
        jest: boolean;
        node: boolean;
    };
    plugins: string[];
    settings: {};
    rules: {
        semi: string[];
        'array-callback-return': string;
        'default-case': string;
        'no-dupe-class-members': string;
        'no-undef': string;
        '@typescript-eslint/consistent-type-assertions': string;
        'no-array-constructor': string;
        '@typescript-eslint/no-array-constructor': string;
        'no-use-before-define': string;
        '@typescript-eslint/no-use-before-define': (string | {
            functions: boolean;
            classes: boolean;
            variables: boolean;
            typedefs: boolean;
        })[];
        'no-unused-expressions': string;
        '@typescript-eslint/no-unused-expressions': (string | {
            allowShortCircuit: boolean;
            allowTernary: boolean;
            allowTaggedTemplates: boolean;
        })[];
        'no-unused-vars': string;
        '@typescript-eslint/no-unused-vars': (string | {
            args: string;
            ignoreRestSiblings: boolean;
        })[];
        'no-useless-constructor': string;
        '@typescript-eslint/no-useless-constructor': string;
        'dot-location': string[];
        eqeqeq: string[];
        'new-parens': string;
        'no-caller': string;
        'no-cond-assign': string[];
        'no-const-assign': string;
        'no-control-regex': string;
        'no-delete-var': string;
        'no-dupe-args': string;
        'no-dupe-keys': string;
        'no-duplicate-case': string;
        'no-empty-character-class': string;
        'no-empty-pattern': string;
        'no-eval': string;
        'no-ex-assign': string;
        'no-extend-native': string;
        'no-extra-bind': string;
        'no-extra-label': string;
        'no-fallthrough': string;
        'no-func-assign': string;
        'no-implied-eval': string;
        'no-invalid-regexp': string;
        'no-iterator': string;
        'no-label-var': string;
        'no-labels': (string | {
            allowLoop: boolean;
            allowSwitch: boolean;
        })[];
        'no-lone-blocks': string;
        'no-loop-func': string;
        'no-mixed-operators': (string | {
            groups: string[][];
            allowSamePrecedence: boolean;
        })[];
        'no-multi-str': string;
        'no-native-reassign': string;
        'no-negated-in-lhs': string;
        'no-new-func': string;
        'no-new-object': string;
        'no-new-symbol': string;
        'no-new-wrappers': string;
        'no-obj-calls': string;
        'no-octal': string;
        'no-octal-escape': string;
        'no-redeclare': (string | {
            builtinGlobals: boolean;
        })[];
        'no-regex-spaces': string;
        'no-restricted-syntax': string[];
        'no-script-url': string;
        'no-self-assign': string;
        'no-self-compare': string;
        'no-sequences': string;
        'no-shadow-restricted-names': string;
        'no-sparse-arrays': string;
        'no-template-curly-in-string': string;
        'no-this-before-super': string;
        'no-throw-literal': string;
        'no-unreachable': string;
        'no-unused-labels': string;
        'no-useless-computed-key': string;
        'no-useless-concat': string;
        'no-useless-escape': string;
        'no-useless-rename': (string | {
            ignoreDestructuring: boolean;
            ignoreImport: boolean;
            ignoreExport: boolean;
        })[];
        'no-with': string;
        'no-whitespace-before-property': string;
        'require-yield': string;
        'rest-spread-spacing': string[];
        strict: string[];
        'unicode-bom': string[];
        'use-isnan': string;
        'valid-typeof': string;
        'getter-return': string;
        'import/first': string;
        'import/no-amd': string;
        'import/no-webpack-loader-syntax': string;
        'import/order': string[];
        quotes: (string | {
            allowTemplateLiterals: boolean;
        })[];
    };
};
export default _default;
