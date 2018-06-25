const scrapePageLinks = require('./src/scrape-page-links.js')

const inputFile = './metadata/sub-subregion-category-links.json'
const outputDir = './metadata/page-links/sub-subregion'
scrapePageLinks(inputFile, outputDir)
