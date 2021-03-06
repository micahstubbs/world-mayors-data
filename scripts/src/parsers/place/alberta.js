const parseH2TableData = require('../page/h2-table.js')
const parseH2UlAlphabetList = require('../page/h2-ul-alphabet-list.js')
const parsePTableNoH2ThumbnailsData = require('../page/p-table-no-h2-thumbnails.js')
const parsePTableNoH2Data = require('../page/p-table-no-h2.js')
const elUl = require('../page/el-list.js')
const parsePUlData = require('../page/p-ul.js')

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
    case '/wiki/List_of_mayors_of_Strathcona,_Alberta':
      return parsePTableNoH2Data(props)
    case '/wiki/List_of_mayors_of_Red_Deer,_Alberta':
      props.el = 'h2'
      return elUl(props)
    case '/wiki/List_of_mayors_of_St._Albert,_Alberta':
      return parsePUlData({ ...props, rowFormat: 'name-term' })
    default:
      return parseH2TableData(props)
  }
}

module.exports = parsePage
