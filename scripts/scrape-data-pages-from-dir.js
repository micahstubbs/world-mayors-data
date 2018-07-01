const fs = require('fs')

const isJSONFile = require('./src/utils/is-json-file.js')
const scrapeWikiPages = require('./src/scrape-wiki-pages.js')

const inputDir = './metadata/page-links/bottom'
let files = fs.readdirSync(inputDir).filter(file => isJSONFile(file))

const cacheIndexPath = `${__dirname}/../cache/index.json`
const cacheIndex = JSON.parse(fs.readFileSync(cacheIndexPath))

// process one file at a time for now
// until we have more confidence in the scrapers
const whiteListedFile = 'Alabama-page-links.json'
files = files.filter(file => file === whiteListedFile)

files.forEach(file => {
  console.log('')
  console.log(`now scraping links in ${file}`)
  console.log('')
  scrapeWikiPages({
    pageLinksFilePath: `${inputDir}/${file}`,
    cacheIndex
  })
})
