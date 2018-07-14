const fs = require('fs')
const csvWriter = require('csv-write-stream')

function writeCSV({ outputFile, outputData }) {
  // write a csv file
  const writer = csvWriter()
  writer.pipe(fs.createWriteStream(outputFile))
  outputData.forEach(d => {
    writer.write(d)
  })
  writer.end()
  console.log(`wrote ${outputFile}`)
}

module.exports = writeCSV
