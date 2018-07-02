function parseKey(keyString) {
  switch (keyString) {
    case 'No.':
    case '&#x2116;':
      return 'number'
    case 'Term in office':
      return 'beginTerm'
    case '':
      return 'endTerm'
    default:
      if (typeof k === 'string') {
        // parse out column name
        // remove footnotes, html tags, and whitespace
        return k
          .toLowerCase()
          .replace(/\[.*\]/g, '')
          .replace(/<.*>/g, '')
          .trim()
      }
      return k
  }
}

module.exports = parseKey
