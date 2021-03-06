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
    case '/wiki/List_of_current_mayors_in_British_Columbia':
      return h2UlAlphabetList(props)
    case '/wiki/List_of_mayors_of_Houston,_British_Columbia':
    case '/wiki/List_of_mayors_of_Penticton':
      props.el = 'h2'
      props.listEl = 'ol'
      return elList(props)
    case '/wiki/List_of_mayors_of_White_Rock,_British_Columbia':
    case '/wiki/List_of_mayors_of_Victoria,_British_Columbia':
      props.el = 'p'
      props.listEl = 'ul'
      return elList(props)
    case '/wiki/List_of_mayors_of_Langley,_British_Columbia_(city)':
    case '/wiki/List_of_mayors_of_Langley,_British_Columbia_(district_municipality)':
    case '/wiki/List_of_mayors_of_Surrey,_British_Columbia':
      return pTableNoH2(props)
    case '/wiki/List_of_mayors_of_Qualicum_Beach,_British_Columbia':
      return table(props)
    case '/wiki/List_of_mayors_of_Vancouver':
      return h2ThumbTable(props)
    default:
      return h2Table(props)
  }
}

module.exports = parsePage
