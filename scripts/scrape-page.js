const fs = require('fs')
const rp = require('request-promise')
const cheerio = require('cheerio')
const cheerioTableparser = require('cheerio-tableparser')
const writeJSON = require('./utils/write-json.js')

function scrapeWikiPage(props) {
  const { link, category } = props
  const uriStem = 'https://en.wikipedia.org'
  const uri = `${uriStem}${link}`
  const transform = body => cheerio.load(body)

  let page = link.split('of_')[1]

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

      // console.log('result', result)
      writeJSON(result, './data', `${category}-${page}-data.json`)
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
    // const tablesDataByRow = tablesDataByTable.map(table => {
    //   return transposeTableData(table)
    // })

    // function transposeTableData(tableData) {
    //   //
    // }

    // function parseColumn(col) {
    //   const colObject = {}
    //   colObject[`col[0]`] = col.slice[(1, col.length)]
    //   return colObject
    // }

    console.log('sectionHeadersText', sectionHeadersText)

    return tablesDataByTable
  }
}

module.exports = scrapeWikiPage
