function isListPage(link) {
  const patterns = [
    '/wiki/List_of_mayors_',
    '/wiki/Mayor_of_',
    '/wiki/Mayors_of_',
    '/wiki/Mayors_in_',
    '/wiki/Politics_of_',
    '/wiki/List_of_presidents_of_Bydgoszcz',
    '/wiki/List_of_rulers_and_officers_of_Galway_',
    '/wiki/List_of_Kazan_mayors',
    '/wiki/Governor_of_Saint_Petersburg',
    '/wiki/Governor_of_Sevastopol',
    '/wiki/List_of_Presidents_of_the_Executive_Council_of_Basel-Stadt',
    '/wiki/List_of_Landammann_of_Davos'
  ]
  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = new RegExp(patterns[i].toLowerCase())
    const found = pattern.test(link.toLowerCase())
    if (found) return true
  }
  return false
}

module.exports = isListPage
