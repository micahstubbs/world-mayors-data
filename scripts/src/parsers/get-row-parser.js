function getRowParser(format) {
  return require(`./row/${format}.js`)
}

module.exports = getRowParser
