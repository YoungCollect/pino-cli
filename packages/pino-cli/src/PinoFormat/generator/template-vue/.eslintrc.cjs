const { extendEslintConfig } = require('@oneyoung/pino-cli/constants/eslint')
const pkg = require('./package.json')

const { lintExtends, lintRules } = extendEslintConfig(['vue'], { pkg })

module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true // For vue3 setup syntax
  },
  extends: [...lintExtends],
  parserOptions: {
    // @babel/eslint-parser can transform new grammar better than default espree
    parser: '@babel/eslint-parser',
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
