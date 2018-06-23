const fs = require('fs')
const scrapeWikiPage = require('./scrape-page.js')
// const logger = require('./utils/logger.js')

const inputFile = 'Albania-page-links.json'
const inputPath = `./metadata/page-links/${inputFile}`

const pageLinks = JSON.parse(fs.readFileSync(inputPath))
const category = inputFile.split('-')[0]
// console.log('pageLinks', pageLinks)

pageLinks.some((link, i) => {
  // logger.info(category)
  // logger.info(link)
  // console.log(category)
  // console.log(link)
  scrapeWikiPage({ link, category })
  // if (i === 0) return true
})
