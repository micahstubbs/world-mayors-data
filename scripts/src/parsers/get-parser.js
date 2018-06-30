function getParser(category) {
  return require(`./page/${category}.js`)
}

module.exports = getParser
