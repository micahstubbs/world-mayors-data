const parseH2TableData = require('../page/h2-table.js')
const parsePTableData = require('../page/p-table.js')
const parsePTableNoH2Data = require('../page/p-table-no-h2.js')
const parsePUlThumbnails = require('../page/p-ul-thumbnails')

function parsePage(props) {
  const { link } = props
  switch (link) {
    case '/wiki/List_of_mayors_of_Juneau,_Alaska':
      return parsePTableData(props)

    case '/wiki/List_of_mayors_of_Fairbanks,_Alaska':
      return parsePUlThumbnails(props)

    case '/wiki/List_of_mayors_of_Cordova,_Alaska':
      return parsePTableNoH2Data(props)

    default:
      return parseH2TableData(props)
  }
}

module.exports = parsePage
