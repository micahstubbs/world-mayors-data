const cheerio = require('cheerio')
const filenamify = require('filenamify')

const getParser = require('./parsers/get-parser.js')
const writeJSON = require('./utils/write-json.js')

function parseWikiPage({ body, link, category }) {
  const $ = cheerio.load(body)

  // parse out city name
  // drop any text that appears after a comma
  // lowercase to make nice filenames
  let page = filenamify(
    link
      .split('of_')
      [link.split('of_').length - 1].replace(/\,.*/, '')
      .replace('wiki/', '')
      .toLowerCase()
  )

  const result = getParser(category)({ $, category, page, link })

  writeJSON(result, `./data/${category}-${page}-data.json`)
}

module.exports = parseWikiPage
