const fs = require('fs')
const rp = require('request-promise')
const cheerio = require('cheerio')
const cheerioTableparser = require('cheerio-tableparser')
const writeJSON = require('./utils/write-json.js')
const logger = require('./utils/logger.js')

function scrapeWikiPage(props) {
  const { link, category } = props
  const uriStem = 'https://en.wikipedia.org'
  const uri = `${uriStem}${link}`
  const transform = body => cheerio.load(body)

  let page = link.split('of_')[link.split('of_').length - 1]

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

      writeJSON(
        result,
        './data',
        `${category.toLowerCase()}-${page.toLowerCase()}-data.json`
      )
    })
    .catch(error => {
      console.error(error)
    })

  const getParser = category => parserHash[category]

  const parserHash = {
    Albania: parseAlbaniaPage
  }

  function parseAlbaniaPage($) {
    // get an array of all sectionHeaders
    // that are followed by a table
    const sectionHeadersText = $('h2')
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

    // get table data
    // for all tables that are immediately preceded by
    // an h2 element
    const tablesData = $('table')
      .filter((i, el) => {
        return $(el)
          .prev()
          .is('h2')
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

      const rowKeys = keys.map(k => {
        switch (k) {
          case 'No.':
            return 'number'
          case 'Term in office':
            return 'beginTerm'
          case '':
            return 'endTerm'
          default:
            if (typeof k === 'string') {
              return k.toLowerCase()
            }
            return k
        }
      })

      // TODO check that all values are equal length
      // in other words handle missing values case
      for (let i = 0; i < values[0].length; i += 1) {
        const rowObject = {}
        for (let j = 0; j < rowKeys.length; j += 1) {
          rowObject[rowKeys[j]] = values[j][i]
        }
        rowObject.era = era
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
}

module.exports = scrapeWikiPage
