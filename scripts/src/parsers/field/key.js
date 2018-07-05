function parseKey(keyString, page) {
  let currentPage = page || ''
  let cleanedKeyString = keyString
  // if key is a link tag, use the title of the link tag as the string
  // that is, if the table column header is a hyperlink
  if (/<a\shref/.test(keyString)) {
    const match = keyString.match(/title=\"[\w\s=\\"\/\.\?&;\(\)-:%#]*\"/)
    if (match !== null)
      cleanedKeyString = match[0].replace(/title=\"/, '').replace(/\"/, '')
  }

  // handle a few special case
  if (keyString === '' && page === 'edmonton') {
    return 'name'
  } else if (keyString === '' && page === 'tucson') {
    return 'noHeader'
  }

  switch (cleanedKeyString) {
    case 'No.':
    case '&#x2116;':
    case '#':
      return 'number'
    case 'mayoral term':
    case 'Mayoral Term':
    case 'Mayoral term':
    case 'In office':
    case 'Year of mayorship':
      return 'term'
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
    case 'Lord Mayor':
    case 'representative':
    case 'Alcalde':
      return 'name'
    default:
      if (typeof cleanedKeyString === 'string') {
        // parse out column name
        // remove footnotes, html tags, and whitespace
        return cleanedKeyString
          .toLowerCase()
          .replace(/\[.*\]/g, '')
          .replace(/<.*>/g, '')
          .trim()
      }
      return cleanedKeyString
  }
}

module.exports = parseKey
