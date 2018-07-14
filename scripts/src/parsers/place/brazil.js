const h2Table = require('../page/h2-table.js')
const pTableNoH2 = require('../page/p-table-no-h2.js')

// const h2PUl = require('../page/h2-p-ul.js')
// const h2ThumbUl = require('../page/h2-thumb-ul.js')
// const h3Table = require('../page/h3-table.js')
// const mwHeadlineTable = require('../page/mw-headline-table.js')
// const h2Ul = require('../page/h2-ul.js')

function parsePage(props) {
  const { link } = props
  let combinedData

  switch (link) {
    case '/wiki/List_of_mayors_of_%C3%81guas_de_S%C3%A3o_Pedro':
      return pTableNoH2(props)
    default:
      return h2Table(props)
  }
}

module.exports = parsePage
