module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['airbnb-base'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'simple-import-sort'],
    rules: {
        semi: ['error', 'never'],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
    },
}
