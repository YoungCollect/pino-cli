import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default {
  alias: {
    '@pino-cli': resolve(__dirname, '../../pino-cli'),
    '~pino-cli': resolve(__dirname, '../src')
  }
}
