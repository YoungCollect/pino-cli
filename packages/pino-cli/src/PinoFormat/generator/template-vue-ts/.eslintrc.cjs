const { extendEslintConfig } = require('@oneyoung/pino-cli/constants/eslint')
const pkg = require('./package.json')

const { lintExtends, lintRules } = extendEslintConfig(['vue', 'ts'], { pkg })

module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true // For vue3 setup syntax
  },
  extends: [...lintExtends],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    babelOptions: {
      parserOpts: {
        // Support parse jsx
        plugins: ['jsx']
      }
    }
  },
  rules: {
    ...lintRules,
    'vue/html-closing-bracket-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off'
  }
}
