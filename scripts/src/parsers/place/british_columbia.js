const h2Table = require('../page/h2-table.js')
const h2UlAlphabetList = require('../page/h2-ul-alphabet-list.js')
const elList = require('../page/el-list.js')

function parsePage(props) {
  const { link } = props
  let combinedData = []

  switch (link) {
    case '/wiki/List_of_current_mayors_in_British_Columbia':
      return h2UlAlphabetList(props)
    case '/wiki/List_of_mayors_of_Houston,_British_Columbia':
      props.el = 'h2'
      props.listEl = 'ol'
      return elList(props)
    default:
      return h2Table(props)
  }
}

module.exports = parsePage
