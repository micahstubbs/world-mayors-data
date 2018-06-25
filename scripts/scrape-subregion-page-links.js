const scrapePageLinks = require('./src/scrape-page-links.js')

const inputFile = './metadata/subregion-category-links.json'
const outputDir = './metadata/page-links/subregion'
scrapePageLinks(inputFile, outputDir)
