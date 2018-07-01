const fs = require('fs')
const rp = require('request-promise')
const cheerio = require('cheerio')

const writeJSON = require('./src/utils/write-json.js')
const insertJSON = require('./src/utils/insert-json.js')
const getPageFileName = require('./src/get-page-file-name.js')

// the page to scrape
const uri = 'https://en.wikipedia.org/wiki/Category:Lists_of_mayors'

rp({ uri })
  .then(body => {
    // create the cache if it does not already exist
    if (!fs.existsSync('../cache')) {
      fs.mkdirDirSync('../cache')
    }
    // write out body to file in cache
    const pageFileName = getPageFileName(uri)
    const pageFilePath = `../cache/${pageFileName}`
    fs.writeFileSync(pageFilePath, body)
    console.log(`wrote ${pageFilePath}`)

    // write filename to index.json in cache

    const indexFilePath = '../cache/index.json'
    if (!fs.existsSync(indexFilePath)) {
      fs.writeFileSync(indexFilePath, JSON.stringify({}))
    }
    const cacheIndexEntry = {
      key: uri,
      value: { pageFileName, timestamp: new Date().toISOString() }
    }
    insertJSON({ data: cacheIndexEntry, filePath: '../cache/index.json' })

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
