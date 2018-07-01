const fs = require('fs')
const scrapeWikiPage = require('./scrape-wiki-page.js')
const cachedPageIsFresh = require('./cached-page-is-fresh.js')
const parseWikiPage = require('./parse-wiki-page.js')

function scrapeWikiPages({ pageLinksFilePath, cacheIndex }) {
  const pageLinks = JSON.parse(fs.readFileSync(pageLinksFilePath))
  const category = pageLinksFilePath
    .split('/')
    [pageLinksFilePath.split('/').length - 1].split('-')[0]
    .toLowerCase()

  pageLinks.forEach((link, i) => {
    const uriStem = 'https://en.wikipedia.org'
    const uri = `${uriStem}${link}`

    // TODO: refactor this if/else block to be more DRY
    const cacheEntry = cacheIndex[uri]
    if (!cacheEntry) {
      // if this page is not in the cache, scrape it
      console.log(`no cache entry, now scraping ${link}`)
      scrapeWikiPage({ link, category }).then(body =>
        // and parse the html we just scraped
        parseWikiPage({ body, link, category })
      )
    } else {
      if (!cachedPageIsFresh(cacheEntry.timestamp)) {
        // if our cached version of this page is not fresh, scrape
        console.log(`cache entry stale, now scraping ${link}`)
        scrapeWikiPage({ link, category }).then(body =>
          // and parse the html we just scraped
          parseWikiPage({ body, link, category })
        )
      } else {
        console.log(`fresh cache entry found for ${link}`)

        // read the cached file and parse that
        const cachedPageFilePath = `${__dirname}/../../cache/${
          cacheEntry.pageFileName
        }`
        fs.readFile(cachedPageFilePath, (err, body) => {
          parseWikiPage({ body, link, category })
        })
      }
    }
  })
}

module.exports = scrapeWikiPages
