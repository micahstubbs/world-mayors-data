function parseTerm(termString) {
  // handle many different kinds of term separator characters
  //
  // the dashes are in fact different unicode characters
  // even though you may not be able to see the difference here
  let term
  const cleanedTermString = termString.replace(
    /<[\w\s=\\"\/\.\?&;\(\):%#"]*>/g,
    ''
  )

  if (/—/.test(cleanedTermString)) {
    term = cleanedTermString.split('—')
  } else if (/–/.test(cleanedTermString)) {
    term = cleanedTermString.split('–')
  } else if (/&#x2013;/.test(cleanedTermString)) {
    term = cleanedTermString.split('&#x2013;')
  } else if (/&#x2014;/.test(cleanedTermString)) {
    term = cleanedTermString.split('&#x2014;')
  } else {
    term = cleanedTermString.split('-')
  }

  const beginTerm = term[0]
    .replace(/\[.*\]/, '')
    .replace(/[\(\)]/, '')
    .trim()

  // handle case where term begins and ends in same year
  // and is described only with that year, listed once
  // 1855 vs 1855-1857
  let endTerm
  if (term.length === 2)
    endTerm = term[1]
      .replace(/\[.*\]/, '')
      .replace(/[\(\)]/, '')
      .trim()
  else
    endTerm = term[0]
      .replace(/\[.*\]/, '')
      .replace(/[\(\)]/, '')
      .trim()
  // TODO refactor variable names to make using
  // this to parse lifespans feel comfortable too
  return { beginTerm, endTerm }
}

module.exports = parseTerm
