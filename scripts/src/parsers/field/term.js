function parseTerm(termString) {
  // handle many different kinds of term separator characters
  //
  // the dashes are in fact different unicode characters
  // even though you may not be able to see the difference here
  let term
  if (/—/.test(termString)) {
    term = termString.split('—')
  } else if (/–/.test(termString)) {
    term = termString.split('–')
  } else if (/&#x2014;/.test(termString)) {
    term = termString.split('&#x2014;')
  } else {
    term = termString.split('-')
  }

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