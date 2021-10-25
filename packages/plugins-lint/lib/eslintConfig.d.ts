/**
 * @file eslint options
 */
declare const base: {
    root: boolean;
    parser: string;
    parserOptions: {
        project: string[];
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
        es2020: boolean;
        node: boolean;
    };
    plugins: string[];
    settings: {};
    extends: string[];
    rules: {
        semi: string[];
        strict: string[];
        eqeqeq: string[];
        quotes: (string | {
            allowTemplateLiterals: boolean;
        })[];
        '@typescript-eslint/no-explicit-any': string;
        '@typescript-eslint/no-floating-promises': string;
        '@typescript-eslint/no-unsafe-call': string;
        '@typescript-eslint/no-unsafe-return': string;
        '@typescript-eslint/consistent-type-assertions': string;
        '@typescript-eslint/restrict-plus-operands': string;
        '@typescript-eslint/no-unsafe-assignment': string;
        '@typescript-eslint/ban-ts-comment': (string | {
            'ts-expect-error': string;
            'ts-ignore': string;
            'ts-nocheck': string;
            'ts-check': string;
        })[];
        '@typescript-eslint/no-unsafe-member-access': string;
        '@typescript-eslint/no-array-constructor': string;
        '@typescript-eslint/no-use-before-define': (string | {
            functions: boolean;
            classes: boolean;
            variables: boolean;
            typedefs: boolean;
        })[];
        '@typescript-eslint/no-unused-expressions': (string | {
            allowShortCircuit: boolean;
            allowTernary: boolean;
            allowTaggedTemplates: boolean;
        })[];
        '@typescript-eslint/no-unused-vars': (string | {
            args: string;
            ignoreRestSiblings: boolean;
        })[];
        '@typescript-eslint/no-useless-constructor': string;
        '@typescript-eslint/ban-types': (string | {
            types: {
                Function: string;
            };
        })[];
        '@typescript-eslint/restrict-template-expressions': string;
        'array-callback-return': string;
        'default-case': string;
        'no-dupe-class-members': string;
        'no-undef': string;
        'no-array-constructor': string;
        'dot-location': string[];
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
        'unicode-bom': string[];
        'use-isnan': string;
        'valid-typeof': string;
        'getter-return': string;
        'import/first': string;
        'import/no-amd': string;
        'import/no-webpack-loader-syntax': string;
        'import/order': string[];
    };
};
declare const vue: {
    root: boolean;
    parser: string;
    parserOptions: {
        project: string[];
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
        es2020: boolean;
        node: boolean;
    };
    plugins: string[];
    settings: {};
    extends: string[];
    rules: {
        semi: string[];
        strict: string[];
        eqeqeq: string[];
        quotes: (string | {
            allowTemplateLiterals: boolean;
        })[];
        '@typescript-eslint/no-explicit-any': string;
        '@typescript-eslint/no-floating-promises': string;
        '@typescript-eslint/no-unsafe-call': string;
        '@typescript-eslint/no-unsafe-return': string;
        '@typescript-eslint/consistent-type-assertions': string;
        '@typescript-eslint/restrict-plus-operands': string;
        '@typescript-eslint/no-unsafe-assignment': string;
        '@typescript-eslint/ban-ts-comment': (string | {
            'ts-expect-error': string;
            'ts-ignore': string;
            'ts-nocheck': string;
            'ts-check': string;
        })[];
        '@typescript-eslint/no-unsafe-member-access': string;
        '@typescript-eslint/no-array-constructor': string;
        '@typescript-eslint/no-use-before-define': (string | {
            functions: boolean;
            classes: boolean;
            variables: boolean;
            typedefs: boolean;
        })[];
        '@typescript-eslint/no-unused-expressions': (string | {
            allowShortCircuit: boolean;
            allowTernary: boolean;
            allowTaggedTemplates: boolean;
        })[];
        '@typescript-eslint/no-unused-vars': (string | {
            args: string;
            ignoreRestSiblings: boolean;
        })[];
        '@typescript-eslint/no-useless-constructor': string;
        '@typescript-eslint/ban-types': (string | {
            types: {
                Function: string;
            };
        })[];
        '@typescript-eslint/restrict-template-expressions': string;
        'array-callback-return': string;
        'default-case': string;
        'no-dupe-class-members': string;
        'no-undef': string;
        'no-array-constructor': string;
        'dot-location': string[];
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
        'unicode-bom': string[];
        'use-isnan': string;
        'valid-typeof': string;
        'getter-return': string;
        'import/first': string;
        'import/no-amd': string;
        'import/no-webpack-loader-syntax': string;
        'import/order': string[];
    };
} & {
    parser: string;
    parserOptions: {
        parser: string;
        project: string[];
        ecmaVersion: number;
        sourceType: string;
        warnOnUnsupportedTypeScriptVersion: boolean;
        extraFileExtensions: string[];
    };
    plugins: string[];
};
export { base, vue };
