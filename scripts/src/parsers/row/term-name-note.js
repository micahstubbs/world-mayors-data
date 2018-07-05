// parse strings like
// 1865–1866: Zebulon P. Davis
// 1866–1867: Robert W. Colart (Removed by Union Army)

function parseRow(props) {
  const { $, el } = props

  const rowString = $(el).text()
  let row
  if (/:/.test(rowString)) {
    row = rowString.split(/:/)
  } else if (/-\s/.test(rowString)) {
    row = rowString.split(/-\s/)
  } else {
    row = [rowString]
  }

  const term = row[0].split('–')
  const beginTerm = term[0]

  // handle case where term begins and ends in same year
  // and is described only with that year, listed once
  // 1854: Joshua Beadle
  // vs
  // 1854-1854: Joshua Beadle
  let endTerm
  if (term.length === 2) endTerm = term[1].trim()
  else endTerm = term[0].trim()

  // console.log('row', row)
  let rowRight = ['', '']
  if (row.length > 1) {
    rowRight = row[1].split('(')
  }

  // parse out name, removing footnotes and whitespace
  const name = rowRight[0].replace(/\[.*\]/, '').trim()

  let note = ''
  if (rowRight.length > 1) note = rowRight[1].replace(/\)/, '').trim()

  return [
    {
      name,
      beginTerm,
      endTerm,
      note
    }
  ]
}

module.exports = parseRow
