function isListPage(link) {
  const patterns = [
    '/wiki/List_of_mayors_',
    '/wiki/Mayor_of_',
    '/wiki/Mayors_of_',
    '/wiki/Mayors_in_',
    '/wiki/Politics_of_'
  ]
  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = new RegExp(patterns[i].toLowerCase())
    const found = pattern.test(link.toLowerCase())
    if (found) return true
  }
  return false
}

module.exports = isListPage
