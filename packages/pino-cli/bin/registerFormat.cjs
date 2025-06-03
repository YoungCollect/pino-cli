const { PinoFormat } = require('~pino-cli/index.cjs')
const { pinoSharedTips } = require('@oneyoung/pino-shared')

exports.registerFormat = program => {
  const pinoFormatCommand = program
    .command('format')
    .description('Pino format setup')
    .option('--vue', 'Setup vue format')
    .option('--ts', 'Setup typescript format')
    .option('--ignore-eslint', 'Ignore eslint config file and deps')
    .action(async options => {
      const { vue, ts, ignoreEslint } = options
      const pinoFormat = new PinoFormat()
      await pinoFormat.setup({
        eslintTypes: [vue ? 'vue' : '', ts ? 'ts' : ''],
        ignoreEslint
      })
    })

  pinoFormatCommand
    .command('lint')
    .description('Pino format lint')
    .action(async () => {
      // eslint-disable-next-line
			pinoSharedTips.pure(`
"Pino Format" dont integrate with "Lint On Save",
so you can run "format:lint" to lint your code by default.
If you want to integrate with "Lint On Save", you can use:
  1. "Vite" (https://www.npmjs.com/package/vite-plugin-eslint)
  2. "Webpack" (https://www.npmjs.com/package/eslint-webpack-plugin)
`,
        {
          color: 'green'
        }
      )
    })

  pinoFormatCommand
    .command('pretty')
    .description('Pino format pretty')
    .action(async () => {
      // eslint-disable-next-line
			pinoSharedTips.pure(`
"Pino Format" dont integrate with "Prettier API",
so you can run "format:pretty" to pretty your code by default.
			`,
        {
          color: 'green'
        }
      )
    })

  // pinoFormatCommand
  //   .command('commit-msg')
  //   .description('Pino format commit-msg')
  //   .option('--no-format', 'Do not format commit message')
  //   .action(async options => {
  //     const pinoFormat = new PinoFormat()
  //     await pinoFormat.formatCommitMsg(options)
  //   })
}
