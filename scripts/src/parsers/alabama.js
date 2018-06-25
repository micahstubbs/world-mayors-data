const parseH2TableData = require('./h2-table.js')
const parseH2UlData = require('./h2-ul.js')
const parseDivUlData = require('./div-ul.js')
const parseTableTableData = require('./table-table.js')
const parseCollapsibleDivUl = require('./collapsible-div-ul.js')

function parsePage(props) {
  const { page } = props
  const pages = [,]
  switch (page) {
    case '/wiki/List_of_mayors_of_Huntsville,_Alabama':
      return parseDivUlData(props)
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
