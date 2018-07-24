const cheerio = require('cheerio')

const getRowParser = require('../get-row-parser.js')
const logger = require('../../utils/logger.js')
const postProcessor = require('../../post-processor.js')

function parsePage(props) {
  const { $, category, page } = props

  // get list data
  // for all list elements that are
  // immediately preceded by
  // an the element specified in props.el
  const sectionHeadersTextSet = new Set()
  let allRows = []
  let listElement = 'ul'
  if (typeof props.listEl !== 'undefined') listElement = props.listEl

  let listIndex
  $(listElement)
    .filter((i, el) => {
      listIndex = i
      return $(el).prev().is(props.el)
    })
    .filter((i, el) => {
      return $(el).prev().text().replace(/\[edit\]/, '') !== 'See also'
    })
    .filter((i, el) => {
      return $(el).prev().text().replace(/\[edit\]/, '') !== 'Notes'
    })
    .filter((i, el) => {
      return $(el).prev().text().replace(/\[edit\]/, '') !== 'External links'
    })
    .filter((i, el) => {
      return $(el).parent().parent().parent().attr('id') !== 'mw-navigation'
    })
    .filter((i, el) => {
      return (
        $(el).parent().parent().parent().parent().attr('id') !== 'mw-navigation'
      )
    })
    .find('li')
    .each((i, el) => {
      let rowFormat = 'number-term-name'
      if (page === 'linz' || page === 'victoria') rowFormat = 'term-name'
      if (
        page === 'vienna' ||
        page === 'rio_de_janeiro' ||
        page === 'houston' ||
        page === 'white_rock' ||
        page === 'penticton'
      )
        rowFormat = 'name-term'

      const era = $(el).parent().prev().text().replace(/\[edit\]/, '')
      sectionHeadersTextSet.add(era)

      const parsedRows = getRowParser(rowFormat)({
        $,
        el,
        era
      })
      allRows = allRows.concat(parsedRows)
    })

  const sectionHeadersText = Array.from(sectionHeadersTextSet)

  logger.info(category)
  logger.info(page)
  logger.info('sectionHeadersText', sectionHeadersText)
  logger.info('')

  console.log(category)
  console.log(page)
  console.log('eras', sectionHeadersText)
  console.log('')

  allRows = postProcessor(allRows)
  return allRows
}

module.exports = parsePage
