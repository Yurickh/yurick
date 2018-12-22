const generateOutput = require('../src/generate-output.js')
const info = require('../info.js')
const config = require('../config.js')

describe('generateOutput', () => {
  it('creates the output with the given input', () => {
    expect(generateOutput(config, info)).toMatchSnapshot()
  })
})
