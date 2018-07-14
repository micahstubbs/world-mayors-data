const h2Table = require('../page/h2-table.js')

const h2PUl = require('../page/h2-p-ul.js')
const h2ThumbUl = require('../page/h2-thumb-ul.js')
const h3Table = require('../page/h3-table.js')
const mwHeadlineTable = require('../page/mw-headline-table.js')
const pTableNoH2 = require('../page/p-table-no-h2.js')
const h2Ul = require('../page/h2-ul.js')

function parsePage(props) {
  const { link } = props
  let combinedData

  switch (link) {
    default:
      return h2Table(props)
  }
}

module.exports = parsePage
