const { pinoSharedTips } = require('@oneyoung/pino-shared')

const eslintExtensions = {
  base: ['.js', '.jsx', '.cjs', '.mjs'],
  vue: ['.vue'],
  ts: ['.ts', '.tsx']
}

const configExtends = {
  base: [
    'eslint:recommended',
    // plugin:prettier/recommended will enable eslint-config-prettier and eslint-plugin-prettier and some rules.
    'plugin:prettier/recommended'
  ],
  // transform plugin:vue/essential in '@vue/cli-plugin-eslint' to plugin:vue/recommended
  vue2: ['plugin:vue/recommended'], // 'plugin:vue/vue3-recommended'
  vue3: ['plugin:vue/vue3-recommended'],
  // standard: ['@vue/standard'],
  ts: ['plugin:@typescript-eslint/recommended']
}

const configRules = {
  base: {
    // Make function space in vue template, but don't use. Eslint will conflict with Prettier.
    // 'space-before-function-paren': 'error',
    'no-unused-vars': [
      'error',
      {
        // Don't lint unused function params
        args: 'none'
      }
    ]
  },
  vue: {
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    // Keep the element closing itself when not contain content.
    'vue/html-self-closing': [
      'error',
      {
        // https://eslint.vuejs.org/rules/html-self-closing.html#vue-html-self-closing
        html: {
          void: 'any'
        }
      }
    ]
  },
  // standard: {
  //   'vue/html-closing-bracket-newline': 'off'
  // },
  ts: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        // Don't lint unused function params
        args: 'none'
      }
    ],
    '@typescript-eslint/no-var-requires': 'off'
  }
}

exports.getEslintExtensions = (eslintTypes = ['vue']) => {
  const { base } = eslintExtensions
  const result = [...base]
  const currentTypes = Array.isArray(eslintTypes) ? eslintTypes : [eslintTypes]
  currentTypes.forEach(type => {
    if (type !== 'base' && eslintExtensions[type]) {
      result.push(...eslintExtensions[type])
    }
  })
  return result
}

exports.getExtends = function (eslintTypes = ['vue'], options) {
  const { pkg = {} } = options
  const { base } = configExtends
  const currentTypes = Array.isArray(eslintTypes) ? eslintTypes : [eslintTypes]

  const result = [...base]
  // 获取Vue版本号并判断主版本号
  const vueVersion = pkg.dependencies?.vue || pkg.devDependencies?.vue
  currentTypes.forEach(type => {
    if (type === 'vue' && vueVersion) {
      if (vueVersion.match(/^\^?3/)) {
        type = 'vue3'
      } else {
        type = 'vue2'
      }
      pinoSharedTips.info(`Vue version: ${vueVersion}`)
    }
    if (type !== 'base' && configExtends[type]) {
      result.push(...configExtends[type])
    }
  })

  return result
}

exports.getRules = function (eslintTypes = ['vue'], options) {
  const { base } = configRules
  let result = {
    ...base
  }
  const currentTypes = Array.isArray(eslintTypes) ? eslintTypes : [eslintTypes]
  currentTypes.forEach(type => {
    if (type !== 'base' && configRules[type]) {
      result = {
        ...result,
        ...configRules[type]
      }
    }
  })
  return result
}

/**
 * @param {string} type - The type of eslint config.
 * @param {object} options - The options of eslint config.
 * @param {object} options.pkg - The package.json of project.
 * @returns {object} - The eslint config.
 */
exports.extendEslintConfig = function (eslintTypes = ['vue'], options = {}) {
  return {
    lintExtends: exports.getExtends(eslintTypes, options),
    lintRules: exports.getRules(eslintTypes, options)
  }
}
