const h2Table = require('../page/h2-table.js')
const pTableNoH2 = require('../page/p-table-no-h2.js')
const elUl = require('../page/el-ul.js')

// const h2PUl = require('../page/h2-p-ul.js')
// const h2ThumbUl = require('../page/h2-thumb-ul.js')
// const h3Table = require('../page/h3-table.js')
// const mwHeadlineTable = require('../page/mw-headline-table.js')

function parsePage(props) {
  const { link } = props
  let combinedData = []

  switch (link) {
    case '/wiki/List_of_mayors_of_%C3%81guas_de_S%C3%A3o_Pedro':
    case '/wiki/List_of_mayors_of_Curitiba':
    case '/wiki/List_of_mayors_of_S%C3%A3o_Bento_(Para%C3%ADba)':
      return pTableNoH2(props)
    case '/wiki/List_of_mayors_of_Rio_de_Janeiro':
      props.el = 'h3'
      const h3UlData = elUl(props)
      combinedData = combinedData.concat(h3UlData)
      return combinedData
    default:
      return h2Table(props)
  }
}

module.exports = parsePage
