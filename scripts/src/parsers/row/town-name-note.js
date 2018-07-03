// parse strings like
// South View: Sandra Benford
// Special Areas Board: Jordon Christianson (Acting Chairperson)

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

  const town = row[0]

  const rowRight = row[1].split(/\(/)

  // parse out name, removing footnotes and whitespace
  const name = rowRight[0]
    .replace(/\[.*\]/, '')
    .replace(/\*/, '')
    .trim()

  let note = ''
  if (rowRight.length > 1) note = rowRight[1].replace(/\)/, '').trim()

  return [
    {
      name,
      town,
      note
    }
  ]
}

module.exports = parseRow
