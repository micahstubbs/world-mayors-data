function parseKey(keyString) {
  switch (keyString) {
    case 'No.':
    case '&#x2116;':
      return 'number'
    case 'Term in office':
    case 'Took office':
    case 'Term Began':
    case 'Term began':
      return 'beginTerm'
    case 'Left office':
    case 'Term Ended':
    case '':
      return 'endTerm'
    case 'Mayor':
    case 'mayor':
    case 'representative':
      return 'name'
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
