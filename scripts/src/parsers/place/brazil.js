const h2Table = require('../page/h2-table.js')
const h2DivTable = require('../page/h2-div-table.js')
const pTableNoH2 = require('../page/p-table-no-h2.js')
const elUl = require('../page/el-list.js')

function parsePage(props) {
  const { link } = props
  let combinedData = []
  let h2TableData

  switch (link) {
    case '/wiki/List_of_mayors_of_%C3%81guas_de_S%C3%A3o_Pedro':
    case '/wiki/List_of_mayors_of_Curitiba':
    case '/wiki/List_of_mayors_of_S%C3%A3o_Bento_(Para%C3%ADba)':
      return pTableNoH2(props)
    case '/wiki/List_of_mayors_of_Rio_de_Janeiro':
      props.el = 'h3'
      const h3UlData = elUl(props)
      h2TableData = h2Table(props)
      combinedData = combinedData.concat(h3UlData).concat(h2TableData)
      return combinedData
    case '/wiki/List_of_mayors_of_S%C3%A3o_Paulo':
      const pTableNoH2Data = pTableNoH2(props)
      const h2DivTableData = h2DivTable(props)
      h2TableData = h2Table(props)
      combinedData = combinedData
        .concat(pTableNoH2Data)
        .concat(h2DivTableData)
        .concat(h2TableData)
      return combinedData
    default:
      return h2Table(props)
  }
}

module.exports = parsePage
