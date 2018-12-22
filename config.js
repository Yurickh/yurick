const chalk = require('chalk')
const id = _ => _

module.exports = {
  // which parameters _not_ to camel case automatically
  forbidCamel: ['npm', 'npx'],

  // what prefixes to use
  prefix: {
    npx: 'npx ',
    twitter: 'https://twitter.com/',
    npm: 'https://npmjs.com/',
    'git-hub': 'https://github.com/',
    'linked-in': 'https://linkedin.com/in/',
  },

  // which colors to use
  // format is [prefix, value]
  // use id for no-color
  color: {
    name: [id, chalk.white],
    handle: [id, chalk.white],
    work: [id, chalk.white],
    twitter: [chalk.gray, chalk.cyan],
    npm: [chalk.gray, chalk.red],
    'git-hub': [chalk.gray, chalk.green],
    'linked-in': [chalk.gray, chalk.blue],
    npx: [chalk.red, chalk.white],
  },

  // order in which the values appear grouped in the card.
  blocks: [['work'], ['twitter', 'npm', 'git-hub', 'linked-in']],
}
