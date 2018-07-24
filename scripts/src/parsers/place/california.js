const h2Table = require('../page/h2-table.js')
const h2UlAlphabetList = require('../page/h2-ul-alphabet-list.js')
const elList = require('../page/el-list.js')
const pTableNoH2 = require('../page/p-table-no-h2.js')
const table = require('../page/table.js')
const h2ThumbTable = require('../page/h2-thumb-table.js')

function parsePage(props) {
  const { link } = props
  let combinedData = []

  switch (link) {
    case '/wiki/List_of_mayors_of_Anaheim,_California':
      const pTableData = pTableNoH2(props)
      props.el = 'h2'
      props.listEl = 'ul'
      const elListData = elList(props)
      combinedData = combinedData.concat(pTableData).concat(elListData)
      return combinedData
    default:
      return h2Table(props)
  }
}

module.exports = parsePage
