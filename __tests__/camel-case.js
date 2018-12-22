const camelCase = require('../src/camel-case')

describe('camelCase', () => {
  it('coverts kebab to camel case', () => {
    expect(camelCase('kebab-case')).toEqual('KebabCase')
  })

  it('leaves spaces unconverted', () => {
    expect(camelCase('camel with-spaces')).toEqual('Camel withSpaces')
  })
})
