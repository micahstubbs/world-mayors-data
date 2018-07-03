const parseH2TableData = require('../page/h2-table.js')
const parseH2UlAlphabetList = require('../page/h2-ul-alphabet-list.js')
// const parsePTableData = require('../page/p-table.js')
// const parsePTableNoH2Data = require('../page/p-table-no-h2.js')
// const parsePUlThumbnails = require('../page/p-ul-thumbnails')

function parsePage(props) {
  const { link } = props
  switch (link) {
    case '/wiki/List_of_mayors_in_Alberta':
      return parseH2UlAlphabetList(props)
    default:
      return parseH2TableData(props)
  }
}

module.exports = parsePage
