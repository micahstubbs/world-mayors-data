// parse strings like
// 1865–1866: Zebulon P. Davis
// 1866–1867: Robert W. Colart (Removed by Union Army)

function parseRow(props) {
  const { $, el } = props

  const rowString = $(el).text()
  const row = rowString.split(':')

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

  const rowRight = row[1].split('(')

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
