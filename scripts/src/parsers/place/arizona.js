const parsePTableNoH2Data = require('../page/p-table-no-h2.js')
const parsePTableTableNoH2Data = require('../page/p-table-table-no-h2.js')

function parsePage(props) {
  const { link } = props
  switch (link) {
    case '/wiki/List_of_mayors_of_Tucson,_Arizona':
      return parsePTableTableNoH2Data(props)
    default:
      return parsePTableNoH2Data(props)
  }
}

module.exports = parsePage
