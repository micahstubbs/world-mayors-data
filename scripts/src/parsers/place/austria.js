const parseH2UlData = require('../page/h2-ul.js')
const parseDlTableData = require('../page/dl-table.js')

function parsePage(props) {
  const { link } = props
  switch (link) {
    case '/wiki/List_of_mayors_of_Vienna':
      const h2UlData = parseH2UlData(props)
      const dlTableData = parseDlTableData(props)
      const combinedData = h2UlData.concat(dlTableData)
      return combinedData
    default:
      return parseH2UlData(props)
  }
}

module.exports = parsePage
