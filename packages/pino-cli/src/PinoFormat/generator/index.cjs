const path = require('node:path')
const { PinoModule } = require('~pino-cli/PinoModule/index.cjs')
const { __DEV__ } = require('~pino-cli/utils/env.cjs')

// 生产环境下采用dist目录的相对路径
const baseTemplate = __DEV__
  ? path.resolve(__dirname, 'template-base')
  : path.resolve(__dirname, '../src/PinoFormat/generator/template-base')
const cjsTemplate = __DEV__
  ? path.resolve(__dirname, 'template-cjs')
  : path.resolve(__dirname, '../src/PinoFormat/generator/template-cjs')
const vueTemplate = __DEV__
  ? path.resolve(__dirname, 'template-vue')
  : path.resolve(__dirname, '../src/PinoFormat/generator/template-vue')
const tsTemplate = __DEV__
  ? path.resolve(__dirname, 'template-ts')
  : path.resolve(__dirname, '../src/PinoFormat/generator/template-ts')
const vueTsTemplate = __DEV__
  ? path.resolve(__dirname, 'template-vue-ts')
  : path.resolve(__dirname, '../src/PinoFormat/generator/template-vue-ts')
// const esTemplate = path.resolve(__dirname, 'template-es')

exports.generator = async (pkg, options) => {
  const pinoModule = new PinoModule({
    moduleName: 'PinoFormat'
  })
  const { eslintTypes, ignoreEslint = false } = options
  // const templateList = pkg.type === 'module' ? [baseTemplate, esTemplate] : [baseTemplate, cjsTemplate]
  let templateList = []
  if (eslintTypes.includes('vue') && eslintTypes.includes('ts')) {
    templateList = [baseTemplate, cjsTemplate, vueTsTemplate]
  } else {
    templateList = eslintTypes.reduce(
      (acc, item) => {
        if (item === 'vue') {
          acc.push(vueTemplate)
        } else if (item === 'ts') {
          acc.push(tsTemplate)
        }
        return acc
      },
      [baseTemplate, cjsTemplate]
    )
  }
  return await pinoModule.postinstall({
    template: templateList,
    // 相对于ProjectRoot
    dirName: '.',
    force: true,
    level: -1,
    parallel: false,
    ignoreReg: ignoreEslint ? /^\.eslintrc\./ : null
  })
}
