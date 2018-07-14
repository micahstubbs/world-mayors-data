function parseKey({ keyString, page, prevKey, era }) {
  let currentPage = page || ''

  let cleanedKeyString = keyString
    .toLowerCase()
    .replace(/(<([^>]+)>)/gi, '')
    .replace(/\n/, ' ')
    .replace('&#x2013;', '-')
    .replace('&#xba;', '')

  // if key is an <a></a> link tag,
  // use the title of the link tag as the string
  // that is, if the table column header is a hyperlink
  if (/<a\shref/.test(keyString)) {
    const match = keyString.match(/title=\"[\w\s=\\"\/\.\?&;\(\)-:%#]*\"/)
    if (match !== null)
      cleanedKeyString = match[0].replace(/title=\"/, '').replace(/\"/, '')
  }

  // page specific dev logging
  if (page === 'brussels') {
    console.log({ keyString })
    console.log({ cleanedKeyString })
    console.log({ prevKey })
    console.log('\n')
  }

  // handle special cases involving one or more
  // '' empty string column headers
  if (keyString === '' && page === 'edmonton') {
    return 'name'
  } else if (keyString === '' && page === 'tucson') {
    return 'noHeader'
  }

  if (era === 'Kingdom of Belgium (1830–present)') {
    if (prevKey === 'number' && cleanedKeyString === '') {
      return 'number'
    }
  }

  // convert many variants to standard form
  switch (cleanedKeyString) {
    case 'No.':
    case '&#x2116;':
    case '#':
      return 'number'
    case 'mayoral term':
    case 'in office':
    case 'year of mayorship':
    case 'term of office':
      return 'term'
    case 'term in office':
    case 'took office':
    case 'term began':
    case 'term start':
    case 'office entered':
    case 'from':
      return 'beginTerm'
    case 'left office':
    case 'term ended':
    case 'term end':
    case 'office left':
    case 'to':
      return 'endTerm'
    case 'term (election)':
      return 'termNumber'
    case 'mayor':
    case 'lord mayor':
    case 'representative':
    case 'alcalde':
      return 'name'
    case 'town':
      return 'city'
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
