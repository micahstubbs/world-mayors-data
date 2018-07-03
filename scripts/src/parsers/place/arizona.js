const parsePTableNoH2Data = require('../page/p-table-no-h2.js')

function parsePage(props) {
  const { link } = props
  switch (link) {
    default:
      return parsePTableNoH2Data(props)
  }
}

module.exports = parsePage
