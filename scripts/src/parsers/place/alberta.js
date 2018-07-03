const parseH2TableData = require('../page/h2-table.js')
const parseH2UlAlphabetList = require('../page/h2-ul-alphabet-list.js')
const parsePTableNoH2ThumbnailsData = require('../page/p-table-no-h2-thumbnails.js')
const parsePTableNoH2Data = require('../page/p-table-no-h2.js')
// const parsePTableData = require('../page/p-table.js')
// const parsePUlThumbnails = require('../page/p-ul-thumbnails')

function parsePage(props) {
  const { link } = props
  switch (link) {
    case '/wiki/List_of_mayors_in_Alberta':
      return parseH2UlAlphabetList(props)
    case '/wiki/List_of_mayors_of_Calgary':
      return parsePTableNoH2ThumbnailsData(props)
    case '/wiki/List_of_mayors_of_Edmonton':
    case '/wiki/List_of_mayors_of_Fort_Saskatchewan':
    case '/wiki/List_of_mayors_of_Lethbridge':
    case '/wiki/List_of_mayors_of_Red_Deer,_Alberta':
    case '/wiki/List_of_mayors_of_St._Albert,_Alberta':
    case '/wiki/List_of_mayors_of_Strathcona,_Alberta':
      return parsePTableNoH2Data(props)
    default:
      return parseH2TableData(props)
  }
}

module.exports = parsePage
