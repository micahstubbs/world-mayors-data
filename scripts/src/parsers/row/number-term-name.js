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
  const row = rowString.split(':')
  const name = row[1].trim()

  const rowLeft = row[0].split(' ')
  let number
  let term
  // handle two different row formats
  // and two different dash characters
  if (rowLeft.length === 2) {
    number = rowLeft[0]
    term = rowLeft[1].split('–')
    if (term.length === 1) term = term[0].split('-')
  } else {
    number = undefined
    term = rowLeft[0].split('–')
    if (term.length === 1) term = term[0].split('-')
  }

  const beginTerm = term[0]
  const endTerm = term[1].replace(/:/, '')

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
