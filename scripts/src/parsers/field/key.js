function parseKey({ keyString, page, prevKey, era }) {
  let currentPage = page || ''

  let cleanedKeyString = keyString
    .toLowerCase()
    .replace(/(<([^>]+)>)/gi, '')
    .replace(/\n/, ' ')
    .replace('&#x2013;', '-')
    .replace('&#xba;', '')
    .replace(/\[.+\]/g, '')

  // if key is an <a></a> link tag,
  // use the title of the link tag as the string
  // that is, if the table column header is a hyperlink
  if (/<a\shref/.test(keyString)) {
    const match = keyString.match(/title=\"[\w\s=\\"\/\.\?&;\(\)-:%#]*\"/)
    if (match !== null)
      cleanedKeyString = match[0].replace(/title=\"/, '').replace(/\"/, '')
  }

  // page specific dev logging
  if (
    page === 'brussels' ||
    page === 'rio_de_janeiro' ||
    page === 's%c3%a3o_paulo'
  ) {
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

  const numberEmptyStringEras = [
    'Kingdom of Belgium (1830–present)',
    'Governors of the State of Guanabara (1960–1975)',
    'Mayors of the Municipality of Rio de Janeiro (1975–present)'
  ]
  if (numberEmptyStringEras.indexOf(era) > -1) {
    if (prevKey === 'number' && cleanedKeyString === '') {
      return 'number'
    }
  }

  const termOfOfficeEmptyStringEras = [
    'Governors of the State of Guanabara (1960–1975)',
    'Mayors of the Municipality of Rio de Janeiro (1975–present)'
  ]
  if (termOfOfficeEmptyStringEras.indexOf(era) > -1) {
    if (cleanedKeyString === 'term of office') return 'beginTerm'
    if (prevKey === 'beginTerm' && cleanedKeyString === '') {
      return 'endTerm'
    }
  }

  const viceMayorEmptyStringEras = [
    'The military dictatorship (1964–1985)',
    'The New Republic (1985–present)'
  ]
  if (viceMayorEmptyStringEras.indexOf(era) > -1) {
    if (cleanedKeyString === '' && prevKey === 'vice mayor(s)') {
      return 'viceMayors'
    }
  }

  // convert many variants to standard form
  switch (cleanedKeyString) {
    case 'No.':
    case 'n':
    case '&#x2116;':
    case '#':
      return 'number'
    case 'mayoral term':
    case 'in office':
    case 'year of mayorship':
    case 'term of office':
    case 'dates':
    case 'mandate':
      return 'term'
    case 'term in office':
    case 'took office':
    case 'term began':
    case 'term start':
    case 'office entered':
    case 'from':
    case 'home of mandate':
      return 'beginTerm'
    case 'left office':
    case 'term ended':
    case 'term end':
    case 'office left':
    case 'to':
    case 'end of mandate':
      return 'endTerm'
    case 'term (election)':
    case 'term (elected)':
      return 'termNumber'
    case 'mayor':
    case 'lord mayor':
    case 'representative':
    case 'alcalde':
    case 'mayor (&#x43a;&#x43c;&#x435;&#x442;, kmet)':
      return 'name'
    case 'town':
      return 'city'
    case 'political party':
      return 'politicalParty'
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
