function isListPage(link) {
  const mayorPatterns = [
    '/wiki/List_of_mayors_',
    '/wiki/Mayor_of_',
    '/wiki/Mayors_of_',
    '/wiki/Mayors_in_',
    '/wiki/Politics_of_',
    '/wiki/List_of_current_mayors_in_',
    '/wiki/List_of_pre-statehood_mayors_of_',
    '/wiki/Civic_mayor_of_',
    '/wiki/Lord_Mayor_of_',
    '/wiki/Lord_Mayors_of_',
    'List_of_lord_mayors_of_',
    '/wiki/List_of_mayors,_lord_mayors_and_administrators_of_',
    '/wiki/List_of_reeves_of_the_former_townships_and_villages_in_',
    '/wiki/List_of_provosts_of_',
    '/wiki/List_of_shire_presidents_of_'
  ]
  const placeSpecificPatterns = [
    '/wiki/List_of_presidents_of_Bydgoszcz',
    '/wiki/List_of_rulers_and_officers_of_Galway_',
    '/wiki/List_of_Kazan_mayors',
    '/wiki/Governor_of_Saint_Petersburg',
    '/wiki/Governor_of_Sevastopol',
    '/wiki/List_of_Presidents_of_the_Executive_Council_of_Basel-Stadt',
    '/wiki/List_of_Landammann_of_Davos',
    '/wiki/List_of_heads_of_London_government',
    '/wiki/Municipality_of_Alexandria',
    '/wiki/Municipality_of_Annandale',
    '/wiki/City_of_Auburn',
    '/wiki/Municipality_of_Balmain',
    '/wiki/Municipality_of_Bexley',
    '/wiki/City_of_Blacktown',
    '/wiki/City_of_Botany_Bay',
    '/wiki/Municipality_of_Camperdown',
    '/wiki/Municipality_of_Darlington',
    '/wiki/Municipality_of_Dundas',
    '/wiki/Municipality_of_Enfield_',
    '/wiki/Municipality_of_Ermington_and_Rydalmere',
    '/wiki/Municipality_of_Erskineville',
    '/wiki/Municipality_of_The_Glebe',
    '/wiki/Municipality_of_Granville',
    '/wiki/City_of_Holroyd',
    '/wiki/Municipality_of_Lidcombe',
    '/wiki/Marrickville_Council',
    '/wiki/Municipality_of_Mascot',
    '/wiki/Municipality_of_Newtown',
    '/wiki/Municipality_of_Paddington',
    '/wiki/Municipality_of_Petersham',
    '/wiki/List_of_officeholders_of_Port_Macquarie-Hastings_Council',
    '/wiki/Municipality_of_Redfern',
    '/wiki/City_of_South_Sydney',
    '/wiki/Municipality_of_St_Peters',
    '/wiki/Municipality_of_Waterloo',
    '/wiki/List_of_wardens_of_Halifax_County'
  ]
  const patterns = mayorPatterns.concat(placeSpecificPatterns)
  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = new RegExp(patterns[i].toLowerCase())
    const found = pattern.test(link.toLowerCase())
    if (found) return true
  }
  return false
}

module.exports = isListPage
