const mapObject = require('../src/map-object')

describe('mapObject', () => {
  it('maps the provided function over the given object', () => {
    expect(
      mapObject(([key, value]) => [key, value * 2], {
        one: 1,
        two: 2,
        three: 3,
      })
    ).toEqual({
      one: 2,
      two: 4,
      three: 6,
    })
  })
})
