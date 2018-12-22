function capitalize(word) {
  const [first, ...rest] = word
  return `${first.toUpperCase()}${rest.join('')}`
}

module.exports = function camelCase(kebab) {
  return kebab
    .split('-')
    .map(capitalize)
    .join('')
}
