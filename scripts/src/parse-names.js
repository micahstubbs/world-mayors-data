const fs = require('fs')

function parseNames({ inputFile }) {
  // parse some metadata out of the filename
  const places = inputFile
    .replace('./data/', '')
    .replace('-data.json', '')
    .split('-')
  const region = places[0]
  const city = places[1]

  const data = JSON.parse(fs.readFileSync(inputFile, 'utf-8'))
  const outputData = data.map(d => ({
    name: d.name,
    city,
    region
  }))
  return outputData
}

module.exports = parseNames
