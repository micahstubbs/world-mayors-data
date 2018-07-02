const parseH2TableData = require('../page/h2-table.js')
// const parseTableTableData = require('../page/table-table.js')
// const parseH2UlData = require('../page/h2-ul.js')
// const parsePUlData = require('../page/p-ul.js')
// const parseDivUlData = require('../page/div-ul.js')
// const parseCollapsibleDivUl = require('../page/collapsible-div-ul.js')

function parsePage(props) {
  const { link } = props
  switch (link) {
    default:
      return parseH2TableData(props)
  }
}

module.exports = parsePage
