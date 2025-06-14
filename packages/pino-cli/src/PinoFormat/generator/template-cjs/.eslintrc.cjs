const { extendEslintConfig } = require('@oneyoung/pino-cli/constants/eslint')
const pkg = require('./package.json')

const { lintExtends, lintRules } = extendEslintConfig(['base'], { pkg })

module.exports = {
  root: true,
  env: {
    node: true
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
    ...lintRules
  }
}
