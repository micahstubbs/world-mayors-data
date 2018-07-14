function spaceNewline({ row }) {
  const outputRow = JSON.parse(JSON.stringify(row))

  Object.keys(outputRow).forEach(key => {
    const value = outputRow[key]
    const keyHasSpace = /\s/.test(key)
    const valueHasNewline = /\n/.test(value)

    console.log({ key })
    console.log({ value })
    console.log({ keyHasSpace })
    console.log({ valueHasNewline })

    if (keyHasSpace && valueHasNewline) {
      const newKeys = key.split(/\s/).map(key => {
        return key.replace(/[\(\)]/g, '')
      })
      const newValues = value.split(/\n/).map(value => {
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
