const cheerio = require('cheerio')
const cheerioTableparser = require('cheerio-tableparser')

const parseTerm = require('../field/term.js')
const logger = require('../../utils/logger.js')
const parseKey = require('../field/key.js')

function parsePage(props) {
  const { $, category, page } = props
  // get an array of all sectionHeaders
  // that are followed by a table
  const sectionHeadersText = $('p')
    // .filter((i, el) => {
    //   return $(el)
    //     .next()
    //     .is('table')
    // })
    .map((i, el) => {
      return $(el)
        .text()
        .replace(/\[edit\]/, '')
    })
    .get()

  // get table data
  // for all tables that are immediately preceded by
  // an h2 element
  const tablesData = $('table')
    .filter((i, el) => {
      return $(el)
        .prev()
        .is('table')
    })
    .map((i, el) => {
      cheerioTableparser($)
      return $(el).parsetable()
    })
    .get()

  // get table data by row
  const tableCount = sectionHeadersText.length
  const columnsCount = tablesData.length / tableCount
  const tablesDataByTable = []
  tablesData.forEach((col, i) => {
    if (columnsCount % (i + 1) === 0) tablesDataByTable.push([])
    const tableIndex = Math.floor(i / columnsCount)
    tablesDataByTable[tableIndex].push(col)
  })

  const tablesDataByRow = tablesDataByTable.map((table, i) => {
    return stitchTableData(table, sectionHeadersText[i])
  })

  function stitchTableData(tableData, era) {
    if (tableData.length === 0) return tableData
    const keys = tableData.map(col => col[0])
    const values = tableData.map(col => col.splice(1, col.length))
    const rows = []

    const rowKeys = keys.map(k => parseKey({ keyString: k, page }))

    // TODO check that all values are equal length
    // in other words handle missing values case
    for (let i = 0; i < values[0].length; i += 1) {
      const rowObject = {}
      for (let j = 0; j < rowKeys.length; j += 1) {
        const currentValue = values[j][i]
          .replace(/\[.*\]/g, '')
          .replace(/<.*>/g, '')

        const currentKey = rowKeys[j]

        // handle special cases
        if (currentKey === 'term') {
          const { beginTerm, endTerm } = parseTerm(currentValue)
          rowObject.beginTerm = beginTerm
          rowObject.endTerm = endTerm
        } else {
          rowObject[currentKey] = currentValue
        }
      }
      // rowObject.era = era
      rows.push(rowObject)
    }

    return rows
  }

  function parseColumn(col) {
    const colObject = {}
    colObject[`col[0]`] = col.slice[(1, col.length)]
    return colObject
  }

  logger.info(category)
  logger.info(page)
  logger.info('sectionHeadersText', sectionHeadersText)
  logger.info('')

  console.log(category)
  console.log(page)
  console.log('eras', sectionHeadersText)
  console.log('')

  const allRows = tablesDataByRow.reduce((accumulator, currentValue) =>
    accumulator.concat(currentValue)
  )

  return allRows
}

module.exports = parsePage
