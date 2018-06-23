const fs = require('fs')
const rp = require('request-promise')
const cheerio = require('cheerio')
const writeJSON = require('./utils/write-json.js')

function scrapeWikiPage(props) {
  const { link, category } = props
  const uriStem = 'https://en.wikipedia.org'
  const uri = `${uriStem}${link}`
  const transform = body => cheerio.load(body)

  let page = link.split('of_')[1]

  const options = {
    uri,
    transform
  }

  rp(options)
    .then($ => {
      const result = getParser(category)($)
      // filter for known good patterns
      // /wiki/Mayor_of_
      // /wiki/List_of_mayors_of_

      // console.log('result', result)
      writeJSON(result, './data', `${category}-${page}-data.json`)
    })
    .catch(error => {
      console.error(error)
    })

  const getParser = category => parserHash[category]

  const parserHash = {
    Albania: parseAlbaniaPage
  }

  function parseAlbaniaPage($) {
    const headers = $('h2')
      .filter((i, el) => {
        return $(el)
          .next()
          .is('table')
      })
      .map((i, el) => {
        return $(el)
          .text()
          .replace(/\[edit\]/, '')
      })
      .get()

    console.log('headers', headers)
    return headers
  }
}

module.exports = scrapeWikiPage
