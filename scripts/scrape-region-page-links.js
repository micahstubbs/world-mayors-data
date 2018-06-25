const scrapePageLinks = require('./src/scrape-page-links.js')

const inputFile = './metadata/region-category-links.json'
const outputDir = './metadata/page-links/region'
scrapePageLinks(inputFile, outputDir)
