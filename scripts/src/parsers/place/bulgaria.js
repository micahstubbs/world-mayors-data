const h2Table = require('../page/h2-table.js')
const pTableNoH2 = require('../page/p-table-no-h2.js')

function parsePage(props) {
  const { link } = props
  let combinedData = []

  switch (link) {
    case '/wiki/List_of_mayors_of_Sofia':
      return h2Table(props)
    default:
      return pTableNoH2(props)
  }
}

module.exports = parsePage
