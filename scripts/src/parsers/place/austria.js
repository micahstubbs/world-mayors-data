const parseH2UlData = require('../page/h2-ul.js')

function parsePage(props) {
  const { link } = props
  switch (link) {
    default:
      return parseH2UlData(props)
  }
}

module.exports = parsePage
