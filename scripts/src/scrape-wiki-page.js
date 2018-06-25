const fs = require('fs')
const rp = require('request-promise')
const cheerio = require('cheerio')
const cheerioTableparser = require('cheerio-tableparser')
const writeJSON = require('./utils/write-json.js')
const logger = require('./utils/logger.js')

function scrapeWikiPage(props) {
  const { link, category } = props
  const 
  const uriStem = 'https://en.wikipedia.org'
  const uri = `${uriStem}${link}`
  const transform = body => cheerio.load(body)

  let page = link.split('of_')[link.split('of_').length - 1].toLowerCase()

  const options = {
    uri,
    transform
  }

  rp(options)
    .then($ => {
      const result = getParser(category)($)

      writeJSON(
        result,
        `./data/${category}-${page}-data.json`
      )
    })
    .catch(error => {
      console.error(error)
    })
}

module.exports = scrapeWikiPage
