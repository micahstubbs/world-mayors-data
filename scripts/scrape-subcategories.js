const rp = require('request-promise')
const cheerio = require('cheerio')
const writeJSON = require('./utils/write-json.js')

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
    // console.log($('body'))
    // #mw-subcategories >
    const result = $('#mw-subcategories li')
      .map((i, el) => {
        return $(el)
          .find('a')
          .attr('href')
      })
      .get()

    console.log('result', result)
    writeJSON(result, './metadata', 'subcategory-links.json')
  })
  .catch(error => {
    console.error(error)
  })
