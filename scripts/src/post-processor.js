const spaceNewline = require('./parsers/row/space-newline.js')
const separatorSeparator = require('./parsers/row/separator-separator.js')

function postProcessor(allRows) {
  const outputData = allRows.map(row => {
    let outputRow
    outputRow = spaceNewline({ row })
    outputRow = separatorSeparator({
      row: outputRow,
      keySeparator: '-',
      valueSeparator: '-'
    })
    return outputRow
  })
  return outputData
}

module.exports = postProcessor
