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
  const row = rowString.split(',')

  // parse out name, remove footnotes and whitespace
  const name = row
    .shift()
    .replace(/\[.*\]/, '')
    .trim()

  const terms = row[0].split(',')
  terms.forEach(termString => {
    const term = termString.split('–')
    const beginTerm = term[0].replace(/\[.*\]/, '').trim()

    // handle case where term begins and ends in same year
    // and is described only with that year, listed once
    // 1855 vs 1855-1857
    let endTerm
    if (term.length === 2) endTerm = term[1].replace(/\[.*\]/, '').trim()
    else endTerm = term[0].replace(/\[.*\]/, '').trim()
    derivedRows.push({
      name,
      beginTerm,
      endTerm
    })
  })

  return derivedRows
}

module.exports = parseRow
