const fs = require('fs')
const rp = require('request-promise')
const cheerio = require('cheerio')

const writeJSON = require('./utils/write-json.js')

const getParser = require('./get-parser.js')

function scrapeWikiPage(props) {
  const { link, category } = props
  const uriStem = 'https://en.wikipedia.org'
  const uri = `${uriStem}${link}`
  const transform = body => cheerio.load(body)

  // parse out city name
  // drop any text that appears after a comma
  // lowercase to make nice filenames
  let page = link
    .split('of_')
    [link.split('of_').length - 1].replace(/\,.*/, '')
    .toLowerCase()

  const options = {
    uri,
    transform
  }

  rp(options)
    .then($ => {
      const result = getParser(category)({ $, category, page })

      writeJSON(result, `./data/${category}-${page}-data.json`)
    })
    .catch(error => {
      console.error(error)
    })
}

module.exports = scrapeWikiPage
