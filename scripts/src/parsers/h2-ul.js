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
  const tablesData = []

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
      if (rowLeft.length === 2) {
        number = rowLeft[0]
        term = rowLeft[1].split('–')
        console.log('term', term)
        if (term.length === 1) term = term[0].split('-')
      } else {
        number = undefined
        term = rowLeft[0].split('–')
        console.log('term', term)
        if (term.length === 1) term = term[0].split('-')
      }

      const beginTerm = term[0]
      const endTerm = term[1].replace(/:/, '')

      const era = sectionHeadersText

      tablesData[i] = {
        number,
        name,
        beginTerm,
        endTerm,
        era
      }
    })

  // .each((i, el) => {
  //   const header = $(el)
  //     .prev()
  //     .text()
  //     .replace(/\[edit\]/, '')

  //   const row = $(el)
  //     .find('li')
  //     .text()

  //   console.log('header', header)
  //   console.log('row', row)
  // })

  console.log('tablesData', tablesData)

  // get table data by row
  // const tableCount = sectionHeadersText.length
  // const columnsCount = tablesData.length / tableCount
  // const tablesDataByTable = []
  // tablesData.forEach((col, i) => {
  //   if (columnsCount % (i + 1) === 0) tablesDataByTable.push([])
  //   const tableIndex = Math.floor(i / columnsCount)
  //   tablesDataByTable[tableIndex].push(col)
  // })

  // const tablesDataByRow = tablesDataByTable.map((table, i) => {
  //   return stitchTableData(table, sectionHeadersText[i])
  // })

  // function stitchTableData(tableData, era) {
  //   if (tableData.length === 0) return tableData
  //   const keys = tableData.map(col => col[0])
  //   const values = tableData.map(col => col.splice(1, col.length))
  //   const rows = []

  //   const rowKeys = keys.map(k => {
  //     switch (k) {
  //       case 'No.':
  //         return 'number'
  //       case 'Term in office':
  //         return 'beginTerm'
  //       case '':
  //         return 'endTerm'
  //       default:
  //         if (typeof k === 'string') {
  //           return k.toLowerCase()
  //         }
  //         return k
  //     }
  //   })

  //   // TODO check that all values are equal length
  //   // in other words handle missing values case
  //   for (let i = 0; i < values[0].length; i += 1) {
  //     const rowObject = {}
  //     for (let j = 0; j < rowKeys.length; j += 1) {
  //       rowObject[rowKeys[j]] = values[j][i]
  //     }
  //     rowObject.era = era
  //     rows.push(rowObject)
  //   }

  //   return rows
  // }

  // function parseColumn(col) {
  //   const colObject = {}
  //   colObject[`col[0]`] = col.slice[(1, col.length)]
  //   return colObject
  // }

  logger.info(category)
  logger.info(page)
  logger.info('sectionHeadersText', sectionHeadersText)
  logger.info('')

  console.log(category)
  console.log(page)
  console.log('eras', sectionHeadersText)
  console.log('')

  // const allRows = tablesDataByRow.reduce((accumulator, currentValue) =>
  //   accumulator.concat(currentValue)
  // )

  const allRows = tablesData

  return allRows
}

module.exports = parsePage
