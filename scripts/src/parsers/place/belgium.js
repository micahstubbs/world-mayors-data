const parseH2PUlData = require('../page/h2-p-ul.js')
const parseH2ThumbUl = require('../page/h2-thumb-ul.js')
const parseH2Table = require('../page/h2-table.js')
const parseH3TableData = require('../page/h3-table.js')
const parseMwHeadlineTableData = require('../page/mw-headline-table.js')
const parsePTableNoH2 = require('../page/p-table-no-h2.js')
const elUl = require('../page/el-ul.js')

function parsePage(props) {
  const { link } = props
  let combinedData

  switch (link) {
    case '/wiki/List_of_mayors_of_Antwerp':
      const h2PUlData = parseH2PUlData(props)
      const h2ThumbUlData = parseH2ThumbUl(props)
      props.headerText = '1700s'
      const mwHeadlineTableData1700s = parseMwHeadlineTableData(props)
      props.headerText = '1800s'
      const mwHeadlineTableData1800s = parseMwHeadlineTableData(props)
      props.headerText = 'United Kingdom of the Netherlands'
      const mwHeadlineTableDataUKN = parseMwHeadlineTableData(props)
      const h3TableData = parseH3TableData(props)
      combinedData = h2PUlData
        .concat(h2ThumbUlData)
        .concat(mwHeadlineTableData1700s)
        .concat(mwHeadlineTableData1800s)
        .concat(mwHeadlineTableDataUKN)
        .concat(h3TableData)
      return combinedData
    case '/wiki/List_of_mayors_of_Bruges':
      return parsePTableNoH2(props)
    case '/wiki/List_of_mayors_of_the_City_of_Brussels':
      props.el = 'h2'
      const h2UlData = elUl(props)
      const h2TableData = parseH2Table(props)
      combinedData = h2UlData.concat(h2TableData)
      return combinedData
    case '/wiki/List_of_mayors_of_Ghent':
    case '/wiki/List_of_mayors_of_Torhout':
      return parseH2Table(props)
    case '/wiki/List_of_mayors_of_Leuven':
      return parsePTableNoH2(props)
    default:
      // return parseH2Table(props)
      return []
  }
}

module.exports = parsePage
