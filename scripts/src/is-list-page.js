const mayorPagePatterns = require('../metadata/patterns/mayor-page.json')
const placePagePatterns = require('../metadata/patterns/place-page.json')

function isListPage(link) {
  const patterns = mayorPagePatterns.concat(placePagePatterns)
  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = new RegExp(patterns[i].toLowerCase())
    const found = pattern.test(link.toLowerCase())
    if (found) return true
  }
  return false
}

module.exports = isListPage
