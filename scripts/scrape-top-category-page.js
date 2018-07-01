const rp = require('request-promise')
const cheerio = require('cheerio')

const writeJSON = require('./src/utils/write-json.js')
const cachePage = require('./src/cache-page.js')

// the page to scrape
const uri = 'https://en.wikipedia.org/wiki/Category:Lists_of_mayors'

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
