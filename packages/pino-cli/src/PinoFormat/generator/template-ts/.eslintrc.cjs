const { extendEslintConfig } = require('@oneyoung/pino-cli/constants/eslint')
const pkg = require('./package.json')

const { lintExtends, lintRules } = extendEslintConfig(['ts'], { pkg })

module.exports = {
  root: true,
  env: {
    node: true
    // 'vue/setup-compiler-macros': true // For vue3 setup syntax
  },
  extends: [...lintExtends],
  parserOptions: {
    // Use @typescript-eslint/parser for ts, and @babel/eslint-parser is for js
    parser: '@typescript-eslint/parser',
    babelOptions: {
      parserOpts: {
        // Support parse jsx
        // plugins: ['jsx']
      }
    }
  },
  rules: {
    ...lintRules
  }
}
