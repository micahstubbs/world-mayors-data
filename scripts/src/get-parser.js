function getParser(category) {
  return require(`./parsers/${category}.js`)
}

module.exports = getParser
