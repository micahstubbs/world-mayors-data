const fs = require('fs')
const rp = require('request-promise')

const writeJSON = require('./utils/write-json.js')
const cachePage = require('./cache-page.js')
const cachedPageIsFresh = require('./cached-page-is-fresh.js')
const getParser = require('./parsers/get-parser.js')

function scrapeWikiPage(props) {
  return new Promise(function(resolve, reject) {
    const { link, category } = props
    const uriStem = 'https://en.wikipedia.org'
    const uri = `${uriStem}${link}`

    // parse out city name
    // drop any text that appears after a comma
    // lowercase to make nice filenames
    let page = link
      .split('of_')
      [link.split('of_').length - 1].replace(/\,.*/, '')
      .toLowerCase()

    rp({ uri })
      .then(body => {
        cachePage({ uri, body })
        resolve(body)
      })
      .catch(error => {
        console.error(error)
        reject()
      })
  })
}

module.exports = scrapeWikiPage
