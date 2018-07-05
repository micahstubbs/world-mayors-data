const parseH2TableData = require('../page/h2-table.js')
const parseH2PUlData = require('../page/h2-p-ul.js')
const parseH2ThumbUl = require('../page/h2-thumb-ul.js')

function parsePage(props) {
  const { link } = props
  switch (link) {
    case '/wiki/List_of_mayors_of_Antwerp':
      const h2PUlData = parseH2PUlData(props)
      const h2ThumbUlData = parseH2ThumbUl(props)
      const h2TableData = parseH2TableData(props)
      const combinedData = h2PUlData.concat(h2ThumbUlData).concat(h2TableData)
      return combinedData
    default:
      // return parseH2TableData(props)
      return []
  }
}

module.exports = parsePage
