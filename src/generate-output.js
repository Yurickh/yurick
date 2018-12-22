const chalk = require('chalk')
const boxen = require('boxen')
const fs = require('fs')
const path = require('path')

const { name: packageName } = require('../package.json')
const info = require('../info')
const camelCase = require('./camel-case')
const mapObject = require('./map-object')

const id = _ => _

function applyPrefix({ prefix, color }) {
  return ([key, value]) => {
    const [prefixColor, valueColor] = color[key] || [id, id]

    const coloredPrefix = prefixColor(prefix[key] || '')
    const coloredValue = valueColor(value)

    return [key, `${coloredPrefix}${coloredValue}`]
  }
}

function labelize({ forbidCamel }) {
  return ([key, value]) => {
    const label = forbidCamel.includes(key) ? key : camelCase(key)
    return [key, `${chalk.white.bold(label.padStart(12, ' '))} ${value}`]
  }
}

module.exports = function generateOutput(config, input) {
  const { blocks } = config

  // Define options for Boxen
  const options = {
    padding: 1,
    margin: 1,
    borderStyle: 'round',
  }

  const { name, handle, ...data } = mapObject(applyPrefix(config), info)

  const header = `${' '.repeat(12)} ${name} / ${handle}`
  const outputStrings = mapObject(labelize(config), data)
  const groupedOutput = blocks
    .map(block => block.map(item => outputStrings[item]).join('\n'))
    .join('\n\n')

  const [, prefixedNPX] = applyPrefix(config)(['npx', packageName])
  const [, footer] = labelize(config)(['card', prefixedNPX])

  return `${header}\n\n${groupedOutput}\n\n${footer}`
}
