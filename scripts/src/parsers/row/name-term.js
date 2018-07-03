const parseTerm = require('../field/term.js')

// parse strings like
// D. Henry Robinson, 1842
// Robert Blair, 1844–1848, 1859–1861, 1872)
// Obediah Berry, 1864–1865, 1873, 1877–1878
// ?

function parseRow(props) {
  const { $, el } = props

  const rowString = $(el).text()

  // early return for missing entries
  if (rowString.trim() === '?') return []

  const derivedRows = []

  let row
  if (/,/.test(rowString)) {
    row = rowString.split(',')
  } else if (/\(/.test(rowString)) {
    row = rowString.split(/\(/)
  } else {
    row = [rowString]
  }

  console.log('row from name-term', row)

  // parse out name, remove footnotes and whitespace
  let name
  let terms
  if (row.length > 1) {
    name = row
      .shift()
      .replace(/\[.*\]/, '')
      .trim()
    terms = row[0].split(',')
  } else {
    name = row[0]
    terms = ['']
  }

  terms.forEach(termString => {
    const { beginTerm, endTerm } = parseTerm(termString)
    derivedRows.push({
      name,
      beginTerm,
      endTerm
    })
  })

  return derivedRows
}

module.exports = parseRow
