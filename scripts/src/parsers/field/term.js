function parseTerm(termString) {
  const term = termString.split('–')
  const beginTerm = term[0].replace(/\[.*\]/, '').trim()

  // handle case where term begins and ends in same year
  // and is described only with that year, listed once
  // 1855 vs 1855-1857
  let endTerm
  if (term.length === 2) endTerm = term[1].replace(/\[.*\]/, '').trim()
  else endTerm = term[0].replace(/\[.*\]/, '').trim()
  return { beginTerm, endTerm }
}

module.exports = parseTerm
