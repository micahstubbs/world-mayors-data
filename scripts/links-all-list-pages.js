const fs = require('fs')
const isListPage = require('./is-list-page.js')

function linksAllListPages(linksFilePath) {
  const pageLinks = JSON.parse(fs.readFileSync(linksFilePath, 'utf8'))
  for (let i = 0; i < pageLinks.length; i += 1) {
    const link = pageLinks[i]
    if (!isListPage(link)) return false
  }
  return true
}

module.exports = linksAllListPages
