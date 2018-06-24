const fs = require('fs')
const isListPage = require('./is-list-page.js')
const isCategoryPage = require('./is-category-page.js')

function classifyLinks(linksFilePath) {
  const pageLinks = JSON.parse(fs.readFileSync(linksFilePath, 'utf8'))
  const listPageLinks = []
  const categoryPageLinks = []
  const otherLinks = []

  for (let i = 0; i < pageLinks.length; i += 1) {
    const link = pageLinks[i]
    if (isListPage(link)) listPageLinks.push(link)
    else if (isCategoryPage(link)) categoryPageLinks.push(link)
    else otherLinks.push(link)
  }
  return { listPageLinks, categoryPageLinks, otherLinks }
}

module.exports = classifyLinks
