const fs = require('fs')
const scrapeWikiPage = require('./scrape-wiki-page.js')
const cachedPageIsFresh = require('./cached-page-is-fresh.js')

function scrapeWikiPages({ pageLinksFilePath, cacheIndex }) {
  const pageLinks = JSON.parse(fs.readFileSync(pageLinksFilePath))
  const category = pageLinksFilePath
    .split('/')
    [pageLinksFilePath.split('/').length - 1].split('-')[0]
    .toLowerCase()

  pageLinks.forEach((link, i) => {
    const uriStem = 'https://en.wikipedia.org'
    const uri = `${uriStem}${link}`

    const cacheEntry = cacheIndex[uri]
    if (!cacheEntry) {
      // if this page is not in the cache, scrape it
      console.log(`no cache entry, now scraping ${link}`)
      scrapeWikiPage({ link, category })
    } else if (cacheEntry) {
      const isFresh = cachedPageIsFresh(cacheEntry.timestamp)
      if (!isFresh) {
        // if our cached version of this page is not fresh, scrape
        console.log(`cache entry stale, now scraping ${link}`)
        scrapeWikiPage({ link, category })
      } else {
        console.log(`fresh cache entry found for ${link}`)
      }
    }
  })
}

module.exports = scrapeWikiPages
