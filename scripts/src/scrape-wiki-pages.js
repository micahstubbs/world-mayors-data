const fs = require('fs')
const scrapeWikiPage = require('./scrape-page.js')

// const inputFile = 'Albania-page-links.json'
// const inputPath = `./metadata/page-links/country/${inputFile}`

function scrapeWikiPages(pageLinksFilePath) {
  const pageLinks = JSON.parse(fs.readFileSync(pageLinksFilePath))
  const category = inputFile.split('-')[0].toLowerCase()
  // console.log('pageLinks', pageLinks)

  pageLinks.some((link, i) => {
    scrapeWikiPage({ link, category })
    // optional early stopping
    // if (i === 0) return true
  })
}

module.exports = scrapeWikiPages
