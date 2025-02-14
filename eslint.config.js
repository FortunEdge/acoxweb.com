import StylisticPlugin from '@stylistic/eslint-plugin'
import parser from '@typescript-eslint/parser'

export default [
    {
        files: ['**/*.js', '**/*.tsx','**/*.ts'],
        plugins: {
            stylistic: StylisticPlugin,
        },
        languageOptions: {
            parser
        },
        rules: {
            'stylistic/indent': ['error',4],
            'stylistic/semi': ['error','never'],
            'stylistic/block-spacing': ['error','never'],
            'stylistic/spaced-comment': ['warn', 'always'],
            'stylistic/quotes': ['error', 'single', {'avoidEscape': true, 'allowTemplateLiterals': true}],
            'linebreak-style': ['error','unix'],
        }
    }
]