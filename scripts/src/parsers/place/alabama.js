const parseH2TableData = require('../page/h2-table.js')
const parseTableTableData = require('../page/table-table.js')
const parseH2UlData = require('../page/h2-ul.js')
const parsePUlData = require('../page/p-ul.js')
// const parseDivUlData = require('../page/div-ul.js')
const parseCollapsibleDivUl = require('../page/collapsible-div-ul.js')

function parsePage(props) {
  const { link } = props
  switch (link) {
    case '/wiki/List_of_mayors_of_Huntsville,_Alabama':
      return parsePUlData(props)

    case '/wiki/List_of_mayors_of_Mobile,_Alabama':
      return parseH2UlData(props)

    case '/wiki/List_of_mayors_of_Montgomery,_Alabama':
      return parseTableTableData(props)

    case '/wiki/List_of_mayors_of_Tuscaloosa,_Alabama':
      return parseCollapsibleDivUl(props)

    default:
      return parseH2TableData(props)
  }
}

module.exports = parsePage
