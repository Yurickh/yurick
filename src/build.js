'use strict'

// Pull in our modules
const chalk = require('chalk')
const boxen = require('boxen')
const fs = require('fs')
const path = require('path')

const { name: packageName } = require('../package.json')
const info = require('../info')
const camelCase = require('./camel-case')
const mapObject = require('./map-object')

const forbidCamel = ['npm', 'npx']

const id = _ => _

// Define options for Boxen
const options = {
  padding: 1,
  margin: 1,
  borderStyle: 'round',
}

const prefix = {
  npx: 'npx ',
  twitter: 'https://twitter.com/',
  npm: 'https://npmjs.com/',
  'git-hub': 'https://github.com/',
  'linked-in': 'https://linkedin.com/in/',
}

// [prefixColor, valueColor]
const color = {
  name: [id, chalk.white],
  handle: [id, chalk.white],
  work: [id, chalk.white],
  twitter: [chalk.gray, chalk.cyan],
  npm: [chalk.gray, chalk.red],
  'git-hub': [chalk.gray, chalk.green],
  'linked-in': [chalk.gray, chalk.blue],
  npx: [chalk.red, chalk.white],
}

const blocks = [['work'], ['twitter', 'npm', 'git-hub', 'linked-in']]

function applyPrefix([key, value]) {
  const [prefixColor, valueColor] = color[key] || [id, id]

  const coloredPrefix = prefixColor(prefix[key] || '')
  const coloredValue = valueColor(value)

  return [key, `${coloredPrefix}${coloredValue}`]
}

const { name, handle, ...data } = mapObject(applyPrefix, info)

function labelize([key, value]) {
  const label = forbidCamel.includes(key) ? key : camelCase(key)
  return [key, `${chalk.white.bold(label.padStart(12, ' '))} ${value}`]
}

const header = `${' '.repeat(12)} ${name} / ${handle}`
const outputStrings = mapObject(labelize, data)
const groupedOutput = blocks
  .map(block => block.map(item => outputStrings[item]).join('\n'))
  .join('\n\n')
const footer = labelize(['card', applyPrefix(['npx', packageName])[1]])[1]

const output = `${header}

${groupedOutput}

${footer}`

fs.writeFileSync(
  path.join(__dirname, 'bin/output'),
  chalk.green(boxen(output, options))
)
