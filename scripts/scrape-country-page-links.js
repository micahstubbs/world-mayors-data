const scrapePageLinks = require('./scrape-page-links.js')

const inputFile = './metadata/country-category-links.json'
const outputDir = './metadata/page-links/country'
scrapePageLinks(inputFile, outputDir)
