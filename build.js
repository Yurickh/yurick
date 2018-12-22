const generateOutput = require('./src/generate-output')
const config = require('./config')
const info = require('./info')

const output = generateOutput(config, info)

fs.writeFileSync(
  path.join(__dirname, 'bin/output'),
  chalk.green(boxen(output, options))
)
