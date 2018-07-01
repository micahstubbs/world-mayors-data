const fs = require('fs')
const path = require('path')
const scrapeWikiPage = require('./scrape-wiki-page.js')
const cachedPageIsFresh = require('./cached-page-is-fresh.js')

function scrapeWikiPages(pageLinksFilePath) {
  const pageLinks = JSON.parse(fs.readFileSync(pageLinksFilePath))
  const category = pageLinksFilePath
    .split('/')
    [pageLinksFilePath.split('/').length - 1].split('-')[0]
    .toLowerCase()

  const cacheIndexPath = `${__dirname}/../../cache/index.json`
  const cacheIndex = JSON.parse(fs.readFileSync(cacheIndexPath))

  pageLinks.some((link, i) => {
    const uriStem = 'https://en.wikipedia.org'
    const uri = `${uriStem}${link}`

    const cacheEntry = cacheIndex[uri]
    if (!cacheEntry) {
      // if this page is not in the cache, scrape it
      scrapeWikiPage({ link, category })
    } else if (cacheEntry && !cachedPageIsFresh(cacheEntry.timestamp)) {
      // if our cached version of this page is not fresh, scrape
      scrapeWikiPage({ link, category })
    }
    // optional early stopping
    // if (i === 0) return true
  })
}

module.exports = scrapeWikiPages
