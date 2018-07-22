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

  const suffixSplit = link.split('(')
  let suffix
  if (suffixSplit.length > 1) {
    suffix = suffixSplit[suffixSplit.length - 1].replace(')', '')
  }

  const result = getParser(category)({ $, category, page, link })

  let filename = `./data/${category}-${page}-data.json`
  if (typeof suffix !== 'undefined')
    filename = `./data/${category}-${page}-${suffix}-data.json`

  writeJSON(result, filename)
}

module.exports = parseWikiPage
