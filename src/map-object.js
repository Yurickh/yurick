module.exports = function mapObject(callback, object) {
  return Object.entries(object)
    .map(callback)
    .reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value,
      }),
      {}
    )
}
