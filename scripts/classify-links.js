const fs = require('fs')
const isListPage = require('./is-list-page.js')

function classifyLinks(linksFilePath) {
  const pageLinks = JSON.parse(fs.readFileSync(linksFilePath, 'utf8'))
  const listPageLinks = []
  const otherLinks = []

  for (let i = 0; i < pageLinks.length; i += 1) {
    const link = pageLinks[i]
    if (isListPage(link)) listPageLinks.push(link)
    else otherLinks.push(link)
  }
  return { listPageLinks, otherLinks }
}

module.exports = classifyLinks
