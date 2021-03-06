const cheerioTableparser = require('cheerio-tableparser')

const logger = require('../../utils/logger.js')
const parseTerm = require('../field/term.js')
const parseKey = require('../field/key.js')
const postProcessor = require('../../post-processor.js')

function parsePage(props) {
  const { $, category, page } = props
  // get an array of all sectionHeaders
  // that are followed by a table
  const sectionHeadersText = ['']

  // get table data
  // for all tables that are immediately preceded by
  // a p element
  const tablesData = $('table')
    .filter((i, el) => {
      return $(el)
        .prev()
        .is('p')
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

  function stitchTableData(tableData) {
    if (tableData.length === 0) return tableData
    const keys = tableData.map(col => col[0])
    const values = tableData.map(col => col.splice(1, col.length))
    const rows = []

    const rowKeys = keys.map(k => {
      if (k === '' && page === 'edmonton') {
        return 'name'
      } else {
        return parseKey({ keyString: k, page })
      }
    })

    // TODO check that all values are equal length
    // in other words handle missing values case
    for (let i = 0; i < values[0].length; i += 1) {
      const rowObject = {}
      for (let j = 0; j < rowKeys.length; j += 1) {
        const currentKey = rowKeys[j]

        // console.log('values[j][i]', values[j][i])

        let currentValue = values[j][i]

        // do this test first to handle the case where
        // there is a footnote <a> tag that does not contain the name
        let titleMatch = null
        if (typeof currentValue !== 'undefined') {
          titleMatch = currentValue.match(
            /title=\"[\w\s=\\"\/\.\?&;\(\)-:%#]*\"/
          )
        }
        if (/<a\shref/.test(currentValue) && titleMatch !== null) {
          currentValue = titleMatch[0].replace(/title=\"/, '').replace(/\"/, '')
        } else if (currentValue) {
          // remove html tags from values
          currentValue = values[j][i]
            .replace(/<[\w\s=\\"\/\.\?&;\(\)-:%#"]*>/g, '')
            .replace(/\[.*\]/, '')
            .replace(/[\(\)]/, '')
            .replace('(page does not exist)', '')
            .replace('(mayor)', '')
            .replace('&#x201C;', "'")
            .replace('&#x201D;', "'")
        } else {
          currentValue = ''
        }

        // TODO handle multiple discontinuous terms described in one cell
        // example: `1928, 1932,[6][not in citation given] 1934 [7]`
        if (currentKey === 'years' || currentKey === 'term') {
          const { beginTerm, endTerm } = parseTerm(currentValue)
          rowObject.beginTerm = beginTerm
          rowObject.endTerm = endTerm
        }

        // if else block starts here
        if (currentKey === 'name') {
          const name = currentValue.split('\n')
          rowObject.name = name[0]
            .replace(/&quot;/g, '')
            .replace('(page does not exist)', '')
            .replace('(mayor)', '')
            .replace(/\(Curitiba/, '')
            .replace(/\)/g, '')
            .trim()
          if (name.length > 1) {
            const lifespan = parseTerm(name[1])
            rowObject.birth = lifespan.beginTerm
            rowObject.death = lifespan.endTerm
          }
        } else {
          rowObject[currentKey] = currentValue
        }
      }
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

  allRows = postProcessor(allRows)

  return allRows
}

module.exports = parsePage
