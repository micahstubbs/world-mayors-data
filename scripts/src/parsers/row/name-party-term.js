const parseTerm = require('../field/term.js')

// parse strings like
// Abel Whitton (Workingman's Party) 1878–1881
// A. McKinstry 1881–1883
// W.C. Wright (Republican) 1883–1885
// ?

function parseRow(props) {
  const { $, el, era } = props

  const rowString = $(el).text()
  console.log('rowString from name-party-term', rowString)

  // early return for missing entries
  if (rowString.trim() === '?') return []

  const derivedRows = []

  let row
  const wordDigitBorderIndex = rowString.search(/\w\s\d/)
  if (/\(/.test(rowString)) {
    row = rowString.split(/\(/)
    row = [row[0]].concat(row[1].split(/\)/))
  } else if (/,/.test(rowString)) {
    row = rowString.split(',')
  } else if (wordDigitBorderIndex > -1) {
    const separatorIndex = wordDigitBorderIndex + 1
    console.log('separatorIndex', separatorIndex)
    const name = rowString.slice(0, separatorIndex).replace(/"/g, "'").trim()
    const term = rowString.slice(separatorIndex + 1, rowString.length).trim()
    row = [name, term]
  } else {
    row = [rowString]
  }

  console.log('row from name-party-term', row)

  // parse out name, remove footnotes and whitespace
  let name
  let terms
  let party
  if (row.length === 3) {
    name = row.shift().replace(/\[.*\]/, '').trim()
    party = row.shift().replace(/\[.*\]/, '').trim()
    terms = row[0].split(',')
  } else if (row.length === 2) {
    name = row.shift().replace(/\[.*\]/, '').trim()
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
      endTerm,
      party,
      era
    })
  })

  return derivedRows
}

module.exports = parseRow
