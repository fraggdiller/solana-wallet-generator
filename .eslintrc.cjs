module.exports = {
    'env': {
        'browser': true,
        'es2021': true
    },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
    ],
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'rules': {
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'quotes': ['error', 'single', { 'avoidEscape': true }],
        'semi': ['error', 'always'],
        'space-before-function-paren': ['error', 'always'],
        'comma-spacing': ['error', { 'before': false, 'after': true }],
        'object-curly-spacing': ['error', 'always'],
        'space-before-blocks': 'error',
        'no-extra-semi': 0,
        'no-constant-condition': 0,
        'no-undef': 0,
        'no-multi-spaces': ['error', { ignoreEOLComments: false, exceptions: { "Property": false } }],
        'keyword-spacing': ['error', {
            'before': true,
            'after': true,
            'overrides': {
                'return': { 'after': true },
                'throw': { 'after': true },
                'case': { 'after': true }
            }
        }],
        'no-inner-declarations': 0,
        'no-case-declarations': 0,
    }
};
