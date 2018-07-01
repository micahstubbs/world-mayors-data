const fs = require('fs')
const path = require('path')

const cachedPageIsFresh = require('./src/cached-page-is-fresh.js')
const scrapeLink = require('./src/scrape-link.js')

// the page to scrape
const link = '/wiki/Category:Lists_of_mayors'
const uriStem = 'https://en.wikipedia.org'
const uri = `${uriStem}${link}`

const cacheIndexPath = `${__dirname}/../cache/index.json`
const cacheIndex = JSON.parse(fs.readFileSync(cacheIndexPath))
const cacheEntry = cacheIndex[uri]

const selector = '#mw-subcategories li'
const outputPath = './metadata/country-category-links.json'

if (!cacheEntry) {
  console.log(`no cache entry, now scraping ${link}`)
  scrapeLink({ uri, selector, outputPath })
} else {
  if (!cachedPageIsFresh(cacheEntry.timestamp)) {
    console.log(`cache entry stale, now scraping ${link}`)
    scrapeLink({ uri, selector, outputPath })
  } else {
    console.log(`fresh cache entry found for ${link}`)
  }
}
