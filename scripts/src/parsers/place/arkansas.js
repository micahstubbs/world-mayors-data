const parseH2TableData = require('../page/h2-table.js')

function parsePage(props) {
  const { link } = props
  switch (link) {
    default:
      return parseH2TableData(props)
  }
}

module.exports = parsePage
