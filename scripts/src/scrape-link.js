const rp = require('request-promise')
const cheerio = require('cheerio')

const writeJSON = require('./utils/write-json.js')
const cachePage = require('./cache-page.js')

function scrapeLink({ uri, selector, outputPath }) {
  rp({ uri })
    .then(body => {
      cachePage({ uri, body })
      return cheerio.load(body)
    })
    .then($ => {
      const result = $(selector)
        .map((i, el) => {
          return $(el)
            .find('a')
            .attr('href')
        })
        .get()

      console.log('result', result)
      writeJSON(result, outputPath)
    })
    .catch(error => {
      console.error(error)
    })
}

module.exports = scrapeLink
