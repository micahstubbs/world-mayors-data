const parseH2TableData = require('./h2-table.js')
// const parseTableTableData = require('./table-table.js')
const parseH2UlData = require('./h2-ul.js')
// const parsePUlData = require('./p-ul.js')
// const parseDivUlData = require('./div-ul.js')
// const parseCollapsibleDivUl = require('./collapsible-div-ul.js')

function parsePage(props) {
  const { link } = props
  switch (link) {
    case '/wiki/List_of_mayors_of_Huntsville,_Alabama':
      // return parseDivUlData(props)
      return []
    case '/wiki/List_of_mayors_of_Mobile,_Alabama':
      return parseH2UlData(props)
    case '/wiki/List_of_mayors_of_Montgomery,_Alabama':
      // return parseTableTableData(props)
      return []
    case '/wiki/List_of_mayors_of_Tuscaloosa,_Alabama':
      // return parseCollapsibleDivUl(props)
      return []
    default:
      return parseH2TableData(props)
  }
}

module.exports = parsePage
