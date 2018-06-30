function getParser(category) {
  return require(`./place/${category}.js`)
}

module.exports = getParser
