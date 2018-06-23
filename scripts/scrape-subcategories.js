const rp = require('request-promise')
const cheerio = require('cheerio')
const logger = require('./logger.js')

// target
// https://en.wikipedia.org/wiki/Category:Lists_of_mayors

const uri = 'https://en.wikipedia.org/wiki/Category:Lists_of_mayors'
const transform = body => cheerio.load(body)

const options = {
  uri,
  transform
}

rp(options)
  .then($ => {
    logger.info($)
    const subcategoriesMarkup = $('#mw-subcategories')
    logger.info(subcategoriesMarkup)
  })
  .catch(error => {
    logger.error(error)
  })
