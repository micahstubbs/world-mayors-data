const cheerio = require('cheerio')
const cheerioTableparser = require('cheerio-tableparser')

const logger = require('../utils/logger.js')

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
  const allRows = []

  $('ul')
    .filter((i, el) => {
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
    .find('li')
    .each((i, el) => {
      const rowString = $(el).text()
      const row = rowString.split(':')
      const name = row[1].trim()

      const rowLeft = row[0].split(' ')
      console.log('rowLeft', rowLeft)
      let number
      let term
      // handle two different row formats
      // and two different dash characters
      if (rowLeft.length === 2) {
        number = rowLeft[0]
        term = rowLeft[1].split('–')
        if (term.length === 1) term = term[0].split('-')
      } else {
        number = undefined
        term = rowLeft[0].split('–')
        if (term.length === 1) term = term[0].split('-')
      }

      const beginTerm = term[0]
      const endTerm = term[1].replace(/:/, '')

      const era = sectionHeadersText

      allRows[i] = {
        number,
        name,
        beginTerm,
        endTerm,
        era
      }
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
