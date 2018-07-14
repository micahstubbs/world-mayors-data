const spaceNewline = require('./parsers/row/space-newline.js')
const separatorSeparator = require('./parsers/row/separator-separator.js')

function postProcessor(allRows) {
  // a universal post processor for data from all the parsers
  // the goal of this file is to collect
  // special cases in hopes that putting them all together
  // will illuminate opportunities for more general solutions in the future
  let outputData = allRows.map(row => {
    let outputRow
    outputRow = spaceNewline({ row })
    outputRow = separatorSeparator({
      row: outputRow,
      keySeparator: '-',
      valueSeparator: '-'
    })
    // a few special cases
    if (outputRow.name === "Loretta Spencer, Huntsville's first female mayor") {
      outputRow.name = 'Loretta Spencer'
      outputRow.note = "Huntsville's first female mayor"
    }
    return outputRow
  })

  // a few more special cases
  // that require filtering the whole array
  if (
    outputData &&
    outputData.length > 0 &&
    outputData[0].era === 'Mayors of Brazilian state capitals'
  ) {
    outputData = outputData.filter(row => !RegExp('Capitals').test(row.city))
  }

  return outputData
}

module.exports = postProcessor
