const cheerio = require('cheerio')

const getRowParser = require('../get-row-parser.js')
const logger = require('../../utils/logger.js')

function parsePage(props) {
  const { $, category, page, rowFormat = 'term-name-note' } = props
  // get an array of all sectionHeaders
  // that are followed by a table
  const sectionHeadersText = $('p')
    .filter((i, el) => {
      return $(el)
        .next()
        .is('ul')
    })
    .filter((i, el) => {
      return (
        $(el)
          .text()
          .replace(/\[edit\]/, '') !== 'See also'
      )
    })
    .map((i, el) => {
      return $(el)
        .text()
        .replace(/\[edit\]/, '')
    })
    .get()

  // get ul data
  // for all unordered list elements that are
  // immediately preceded by
  // an h2 element
  let allRows = []

  $('ul')
    .filter((i, el) => {
      return $(el)
        .prev()
        .is('p')
    })
    .filter((i, el) => {
      return (
        $(el)
          .prev()
          .text()
          .replace(/\[edit\]/, '') !== 'See also'
      )
    })
    .find('li')
    .each((i, el) => {
      const parsedRows = getRowParser(rowFormat)({ $, el })
      allRows = allRows.concat(parsedRows)
    })

  logger.info(category)
  logger.info(page)
  logger.info('sectionHeadersText', sectionHeadersText)
  logger.info('')

  console.log(category)
  console.log(page)
  console.log('eras', sectionHeadersText)
  console.log('')

  return allRows
}

module.exports = parsePage
