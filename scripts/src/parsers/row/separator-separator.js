function spaceNewline({ row, keySeparator, valueSeparator }) {
  const outputRow = JSON.parse(JSON.stringify(row))

  Object.keys(outputRow).forEach(key => {
    const value = outputRow[key]
    const keyHasSeparator = RegExp(keySeparator).test(key)
    const valueHasSeparator = RegExp(valueSeparator).test(value)

    // console.log({ key })
    // console.log({ value })
    // console.log({ keyHasSeparator })
    // console.log({ valueHasSeparator })

    if (keyHasSeparator && valueHasSeparator) {
      const newKeys = key.split(RegExp(keySeparator)).map(key => {
        return key.replace(/[\(\)]/g, '')
      })
      const newValues = value.split(RegExp(valueSeparator)).map(value => {
        return value.replace(/[\(\)]/g, '').replace('&#x2013;', '-')
      })

      // add the parsed out new keys and values
      if (newKeys.length > 1 && newValues.length > 1) {
        newKeys.forEach((newKey, i) => {
          outputRow[newKey] = newValues[i]
        })
        // remove the old double-key
        delete outputRow[key]
      }
    } else {
      outputRow[key] = value
        .replace('&#x2022;', 'N/A')
        .replace('\n', ' - ')
        .replace(/[\(\)]/g, '')
    }
  })
  return outputRow
}

module.exports = spaceNewline
