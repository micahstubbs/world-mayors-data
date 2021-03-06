const h2Table = require('../page/h2-table.js')
const h2UlAlphabetList = require('../page/h2-ul-alphabet-list.js')
const elList = require('../page/el-list.js')
const pTable = require('../page/p-table.js')
const pTableNoH2 = require('../page/p-table-no-h2.js')
const table = require('../page/table.js')
const h2ThumbTable = require('../page/h2-thumb-table.js')
const thumbTable = require('../page/thumb-table.js')

function parsePage(props) {
  const { link } = props
  let combinedData = []
  let pTableData
  let pTableNoh2Data

  switch (link) {
    case '/wiki/List_of_mayors_of_Anaheim,_California':
      pTableNoh2Data = pTableNoH2(props)
      props.el = 'h2'
      props.listEl = 'ul'
      const elListData = elList(props)
      combinedData = combinedData.concat(pTableNoh2Data).concat(elListData)
      return combinedData
    case '/wiki/List_of_mayors_of_Berkeley,_California':
      props.el = 'b'
      props.listEl = 'ul'
      return elList(props)
    case '/wiki/List_of_mayors_of_Beverly_Hills,_California':
      return thumbTable(props)
    case '/wiki/List_of_mayors_of_Chico,_California':
      pTableData = pTable(props)
      combinedData = pTableData
      return combinedData
    default:
      return h2Table(props)
  }
}

module.exports = parsePage
