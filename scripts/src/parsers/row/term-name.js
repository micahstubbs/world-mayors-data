const parseTerm = require('../field/term.js')

// parse strings like
// 1865–1866: Zebulon P. Davis
// 1866–1867: Robert W. Colart (Removed by Union Army)
//
// also strings like
// 1870 - 1871 Alexander R. Robertson
// 1871 Lumley Franklin

function parseRow(props) {
  const { $, el, era } = props

  const rowString = $(el).text()
  let row
  const digitWordBorderIndex = rowString.search(/\d\s\w/)
  if (/:/.test(rowString)) {
    row = rowString.split(/:/)
  } else if (digitWordBorderIndex > -1) {
    const separatorIndex = digitWordBorderIndex + 1
    const term = rowString.slice(0, separatorIndex)
    const name = rowString.slice(separatorIndex + 1, rowString.length)
    row = [term, name]
  } else if (/-\s/.test(rowString)) {
    row = rowString.split(/-\s/)
  } else {
    row = [rowString]
  }

  console.log('row from term-name field parser', row)

  const { beginTerm, endTerm } = parseTerm(row[0])

  // console.log('row', row)
  let rowRight = ['', '']
  if (row.length > 1) {
    rowRight = row[1].split('(')
  }

  // parse out name, removing footnotes and whitespace
  const name = rowRight[0].replace(/\[.*\]/, '').trim()

  return [
    {
      name,
      beginTerm,
      endTerm,
      era
    }
  ]
}

module.exports = parseRow
