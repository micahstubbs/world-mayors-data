function parseKey(keyString, page) {
  let currentPage = page || ''
  let cleanedKeyString = keyString.toLowerCase()
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
    case 'in office':
    case 'year of mayorship':
      return 'term'
    case 'term in office':
    case 'took office':
    case 'term began':
    case 'office entered':
      return 'beginTerm'
    case 'left office':
    case 'term ended':
    case 'office left':
      return 'endTerm'
    case 'mayor':
    case 'lord mayor':
    case 'representative':
    case 'alcalde':
      return 'name'
    case '':
      return 'emptyString'
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
