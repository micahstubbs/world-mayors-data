const fs = require('fs')
const scrapeWikiPage = require('./scrape-wiki-page.js')

function scrapeWikiPages(pageLinksFilePath) {
  const pageLinks = JSON.parse(fs.readFileSync(pageLinksFilePath))
  const category = pageLinksFilePath
    .split('/')
    [pageLinksFilePath.split('/').length - 1].split('-')[0]
    .toLowerCase()

  pageLinks.some((link, i) => {
    scrapeWikiPage({ link, category })
    // optional early stopping
    // if (i === 0) return true
  })
}

module.exports = scrapeWikiPages
