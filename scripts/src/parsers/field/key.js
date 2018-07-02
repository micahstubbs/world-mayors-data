function parseKey(keyString) {
  switch (keyString) {
    case 'No.':
    case '&#x2116;':
      return 'number'
    case 'Term in office':
    case 'Took office':
      return 'beginTerm'
    case 'Left office':
    case '':
      return 'endTerm'
    default:
      if (typeof keyString === 'string') {
        // parse out column name
        // remove footnotes, html tags, and whitespace
        return keyString
          .toLowerCase()
          .replace(/\[.*\]/g, '')
          .replace(/<.*>/g, '')
          .trim()
      }
      return keyString
  }
}

module.exports = parseKey
