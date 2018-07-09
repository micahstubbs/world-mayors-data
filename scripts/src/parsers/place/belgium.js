const parseH2PUlData = require('../page/h2-p-ul.js')
const parseH2ThumbUl = require('../page/h2-thumb-ul.js')
const parseH2TableData = require('../page/h2-table.js')
const parseMwHeadlineTableData = require('../page/mw-headline-table.js')

function parsePage(props) {
  const { link } = props
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
      const combinedData = h2PUlData
        .concat(h2ThumbUlData)
        .concat(mwHeadlineTableData1700s)
        .concat(mwHeadlineTableData1800s)
        .concat(mwHeadlineTableDataUKN)
      return combinedData
    default:
      // return parseH2TableData(props)
      return []
  }
}

module.exports = parsePage
