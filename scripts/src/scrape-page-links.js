const fs = require('fs')
const rp = require('request-promise')
const cheerio = require('cheerio')

const writeJSON = require('./utils/write-json.js')
const cachePage = require('./cache-page.js')
const cachedPageIsFresh = require('./cached-page-is-fresh.js')
const scrapeLink = require('./scrape-link.js')

function scrapePageLinks(inputFile, outputDir) {
  // target
  // https://en.wikipedia.org/wiki/Category:Lists_of_mayors
  // check if outputDir exists, if not create it
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
  }

  const categoryLinks = JSON.parse(fs.readFileSync(inputFile, 'utf8'))

  categoryLinks.forEach((link, i) => {
    const uriStem = 'https://en.wikipedia.org'
    const uri = `${uriStem}${link}`
    const selector = '.mw-category-generated li'

    // parse out place name
    // handle a few special cases
    let place
    if (link === '/wiki/Category:Lists_of_mayors_(complete_1900-2013)') {
      place = 'Switzerland'
    } else if (link === '/wiki/Category:Lists_of_mayors_of_Lima_by_district') {
      place = 'Lima'
    } else if (link === '/wiki/Category:Lists_of_mayors_of_London_boroughs') {
      place = 'London'
    } else if (link === '/wiki/Category:Mayors_of_Paddington') {
      place = 'Paddington'
    } else place = link.split('in_')[1]

    const outputPath = `${outputDir}/${place}-page-links.json`

    const cacheIndexPath = `${__dirname}/../../cache/index.json`
    const cacheIndex = JSON.parse(fs.readFileSync(cacheIndexPath))
    const cacheEntry = cacheIndex[uri]

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
  })
}

module.exports = scrapePageLinks
