function getRowParser(format) {
  return require(`./parsers/row/${format}.js`)
}

module.exports = getRowParser
