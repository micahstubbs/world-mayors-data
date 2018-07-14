const cheerio = require('cheerio')
const cheerioTableparser = require('cheerio-tableparser')

const logger = require('../../utils/logger.js')
const parseTerm = require('../field/term.js')
const parseKey = require('../field/key.js')

function parsePage(props) {
  const { $, category, page, headerText, dataPrevSelector } = props
  const dataPrevSelectorString = dataPrevSelector || 'h2'
  console.log({ headerText })
  // get an array of all sectionHeaders
  // that are followed by a table
  const sectionHeadersText = $('.mw-headline')
    .filter((i, el) => {
      return $(el)
        .parent()
        .next()
        .is('table')
    })
    .filter((i, el) => {
      if (headerText) {
        // console.log('$(el).text()', $(el).text())
        // console.log({ headerText })
        return (
          $(el)
            .text()
            .replace(/\[edit\]/, '') === headerText
        )
      }
      return true
    })
    .filter((i, el) => {
      return !$(el)
        .parent()
        .is('h3')
    })
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
        .is(dataPrevSelectorString)
    })
    .filter((i, el) => {
      if (headerText) {
        console.log(
          '$(el).prev().text()',
          $(el)
            .prev()
            .text()
            .replace(/\[edit\]/, '')
        )
        console.log({ headerText })

        return (
          $(el)
            .prev()
            .text()
            .replace(/\[edit\]/, '') === headerText
        )
      }
      return true
    })
    .filter((i, el) =>
      $(el)
        .prev()
        .prev()
        .not('h3')
    )
    .map((i, el) => {
      cheerioTableparser($)
      return $(el).parsetable()
    })
    .get()

  // get table data by row
  const tableCount = sectionHeadersText.length
  console.log({ sectionHeadersText })
  console.log('tablesData.length', tablesData.length)
  console.log({ tableCount })

  const columnsCount = tablesData.length / tableCount
  const tablesDataByTable = []

  tablesData.forEach((col, i) => {
    // console.log('columnsCount', columnsCount)
    // console.log('columnsCount % (i + 1)', columnsCount % (i + 1))
    if (columnsCount % (i + 1) === 0) tablesDataByTable.push([])
    const tableIndex = Math.floor(i / columnsCount)
    // console.log({ tableIndex })
    // console.log({ tablesDataByTable })
    if (tableIndex < tablesDataByTable.length) {
      tablesDataByTable[tableIndex].push(col)
    }
  })

  const tablesDataByRow = tablesDataByTable.map((table, i) => {
    return stitchTableData(table, sectionHeadersText[i])
  })

  function stitchTableData(tableData, era) {
    if (tableData.length === 0) return tableData
    const keys = tableData.map(col => col[0])
    const values = tableData.map(col => col.splice(1, col.length))
    const rows = []

    console.log('era', era)
    const rowKeys = keys.map(k => parseKey({ keyString: k, page }))
    console.log('rowKeys', rowKeys)

    // TODO check that all values are equal length
    // in other words handle missing values case
    for (let i = 0; i < values[0].length; i += 1) {
      const rowObject = {}
      for (let j = 0; j < rowKeys.length; j += 1) {
        const currentKey = rowKeys[j]

        // console.log('values[j]', values[j])
        // console.log('values[j].length', values[j].length)
        // console.log('i', i)
        // protect against index values that are too high
        let currentValue = ''
        if (i < values[j].length) {
          // remove html tags & quotes from values
          currentValue = values[j][i]
            .replace(/<[\w\s=\\"\/\.\?&;\(\)-:%#"]*>/g, '')
            .replace(/&quot;/g, '')
        }
        rowObject[currentKey] = currentValue

        if (currentKey === 'years' || currentKey === 'term') {
          const { beginTerm, endTerm } = parseTerm(currentValue)
          rowObject.beginTerm = beginTerm
          rowObject.endTerm = endTerm
        }
      }
      rowObject.era = era

      // if we have parsed out the beginTerm and endTerm
      // delete the original long string term property
      if (rowObject.beginTerm && rowObject.endTerm) delete rowObject.term
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

  let allRows = []
  if (Array.isArray(tablesDataByRow) && tablesDataByRow.length > 0)
    allRows = tablesDataByRow.reduce((accumulator, currentValue) =>
      accumulator.concat(currentValue)
    )

  return allRows
}

module.exports = parsePage
