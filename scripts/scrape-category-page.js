const fs = require('fs')
const path = require('path')
const rp = require('request-promise')
const cheerio = require('cheerio')

const writeJSON = require('./src/utils/write-json.js')
const cachePage = require('./src/cache-page.js')
const cachedPageIsFresh = require('./src/cached-page-is-fresh.js')

// the page to scrape
const link = '/wiki/Category:Lists_of_mayors'
const uriStem = 'https://en.wikipedia.org'
const uri = `${uriStem}${link}`

const cacheIndexPath = `${__dirname}/../cache/index.json`
const cacheIndex = JSON.parse(fs.readFileSync(cacheIndexPath))
const cacheEntry = cacheIndex[uri]

if (!cacheEntry) {
  console.log(`no cache entry, now scraping ${link}`)
} else {
  if (!cachedPageIsFresh(cacheEntry.timestamp)) {
    console.log(`cache entry stale, now scraping ${link}`)
  } else {
    console.log(`fresh cache entry found for ${link}`)
  }
}

function scrape() {
  rp({ uri })
    .then(body => {
      cachePage({ uri, body })
      return cheerio.load(body)
    })
    .then($ => {
      // #mw-subcategories >
      const result = $('#mw-subcategories li')
        .map((i, el) => {
          return $(el)
            .find('a')
            .attr('href')
        })
        .get()

      console.log('result', result)
      writeJSON(result, './metadata/country-category-links.json')
    })
    .catch(error => {
      console.error(error)
    })
}
