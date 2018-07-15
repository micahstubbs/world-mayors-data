const spaceNewline = require('./parsers/row/space-newline.js')
const separatorSeparator = require('./parsers/row/separator-separator.js')

function postProcessor(allRows) {
  // a universal post processor for data from all the parsers
  // the goal of this file is to collect
  // special cases in hopes that putting them all together
  // will illuminate opportunities for more general solutions in the future
  let outputData = allRows.map((row, i) => {
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
    if (
      outputRow.era ===
      'Mayors of the Municipality of Rio de Janeiro 1975–present'
    ) {
      // if an empty term row
      const isEmptyTermRow =
        outputRow.number === '' && outputRow.termNumber !== ''
      if (isEmptyTermRow) {
        // populate attributes from the previous object over
        const prevRow = allRows[i - 1]
        outputRow.number = prevRow.number
        outputRow.portrait = prevRow.portrait
        outputRow.beginTerm = prevRow.beginTerm
        outputRow.endTerm = prevRow.beginTerm
        outputRow.politicalParty = prevRow.politicalParty
        outputRow['name (birth-death)'] = prevRow['name (birth-death)']
      }

      // run this row parse a second time
      // to process merged term rows from the Rio case above
      outputRow = spaceNewline({ row: outputRow })
    }

    const viceMayorEmptyStringEras = [
      'The military dictatorship 1964–1985',
      'The New Republic 1985–present'
    ]
    if (viceMayorEmptyStringEras.indexOf(outputRow.era) > -1) {
      delete outputRow['vice mayor(s)']
    }

    return outputRow
  })

  // a few more special cases
  // that require filtering the whole array
  if (outputData && outputData.length > 0) {
    if (outputData[0].era === 'Mayors of Brazilian state capitals') {
      outputData = outputData.filter(row => !RegExp('Capitals').test(row.city))
    }
    if (
      outputData[0].era === 'Governors of the State of Guanabara 1960–1975' ||
      outputData[0].era ===
        'Mayors of the Municipality of Rio de Janeiro 1975–present'
    ) {
      outputData = outputData.filter(
        row => row.name !== '' && row.termNumber !== ''
      )
    }
  }

  return outputData
}

module.exports = postProcessor
