function getParser(category) {
  return require(`./parsers/page/${category}.js`)
}

module.exports = getParser
