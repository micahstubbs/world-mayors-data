const parseTerm = require('../field/term.js')

// parse strings like
// (40) 1904–1911: Pat Lyons
// 1989-1994: Robert O. Bostwick Jr.

function parseRow(props) {
  const { $, el } = props
  const parentHeaderText = $(el)
    .parent()
    .prev()
    .text()
    .replace(/\[edit\]/, '')

  const rowString = $(el).text()

  // figure out what the row separator character is
  let row
  if (/:/.test(rowString)) {
    row = rowString.split(':')
  } else if (/\s/.test(rowString)) {
    row = rowString.split(/\s/)
    const first = row.shift()
    const rest = row.join(' ')
    row = [first, rest]
  } else {
    row = [rowString]
  }

  let name = ''
  if (row.length > 1) {
    name = row[1].trim()
  }

  const rowLeft = row[0].split(' ')
  let term
  let number
  // handle two different row formats
  // and two different dash characters
  if (rowLeft.length === 2) {
    number = rowLeft[0]
    term = parseTerm(rowLeft[1])
    // term = rowLeft[1].split('–')
    // if (term.length === 1) term = term[0].split('-')
  } else {
    number = undefined
    term = parseTerm(rowLeft[0])
    // term = rowLeft[0].split('–')
    // if (term.length === 1) term = term[0].split('-')
  }

  // const beginTerm = term[0]
  // const endTerm = term[1].replace(/:/, '')
  const { beginTerm, endTerm } = term

  const era = parentHeaderText

  return [
    {
      number,
      name,
      beginTerm,
      endTerm,
      era
    }
  ]
}

module.exports = parseRow
