const cheerio = require('cheerio')

const getRowParser = require('../get-row-parser.js')
const logger = require('../../utils/logger.js')

function parsePage(props) {
  const { $, category, page } = props
  // get an array of all sectionHeaders
  // that are followed by a table
  const sectionHeadersText = $('h2')
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
    .filter((i, el) => {
      return (
        $(el)
          .text()
          .replace(/\[edit\]/, '') !== 'External links'
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

  let ulIndex
  $('ul')
    .filter((i, el) => {
      ulIndex = i
      return $(el)
        .prev()
        .is('h2')
    })
    .filter((i, el) => {
      return (
        $(el)
          .prev()
          .text()
          .replace(/\[edit\]/, '') !== 'See also'
      )
    })
    .filter((i, el) => {
      return (
        $(el)
          .prev()
          .text()
          .replace(/\[edit\]/, '') !== 'External links'
      )
    })
    .find('li')
    .each((i, el) => {
      let rowFormat = 'number-term-name'
      if (page === 'linz') rowFormat = 'term-name'
      if (page === 'vienna') rowFormat = 'name-term'

      const era = $(el)
        .parent()
        .prev()
        .text()
        .replace(/\[edit\]/, '')
      const parsedRows = getRowParser(rowFormat)({
        $,
        el,
        era
      })
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
