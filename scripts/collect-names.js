const fs = require('fs')
const writeCSV = require('./src/utils/write-csv.js')
const parseNames = require('./src/parse-names.js')
const isJSONFile = require('./src/utils/is-json-file.js')

const inputDir = './data'
let files = fs.readdirSync(inputDir).filter(file => isJSONFile(file))

const cacheIndexPath = `${__dirname}/../cache/index.json`
const cacheIndex = JSON.parse(fs.readFileSync(cacheIndexPath))

let outputData = []

files.forEach(file => {
  console.log(`now parsing names from ${file}`)
  const inputFile = `./data/${file}`
  outputData = outputData.concat(parseNames({ inputFile }))
})

const nameHash = {}
const uniqNamesSet = new Set()
const uniqCitiesSet = new Set()
outputData.forEach(row => {
  uniqNamesSet.add(row.name)
  uniqCitiesSet.add(row.city)
  if (typeof nameHash[row.name] === 'undefined') nameHash[row.name] = []
  nameHash[row.name].push(row)
})
const uniqNames = Array.from(uniqNamesSet)
const uniqNamesOutput = uniqNames.map(d => ({ name: d }))
const uniqCities = Array.from(uniqCitiesSet)
const uniqCitiesOutput = uniqCities.map(d => ({ city: d }))

// the big moment
// find names that contain city names
const namesWithCitiesInside = []
uniqNames.forEach(name => {
  uniqCities.forEach(city => {
    const nameContainsCity = RegExp(city, 'i').test(name)
    if (nameContainsCity) {
      // handle case where one person may have been mayor
      // of multiple cities
      const homeCity = nameHash[name]
        .map(row => `${row.city}, ${row.region}`)
        .join(' ')
      namesWithCitiesInside.push({
        name,
        homeCity,
        matchCity: city
      })
    }
  })
})

writeCSV({ outputData, outputFile: './metadata/names.csv' })
writeCSV({
  outputData: uniqNamesOutput,
  outputFile: './metadata/names-unique.csv'
})
writeCSV({
  outputData: uniqCitiesOutput,
  outputFile: './metadata/cities-unique.csv'
})
writeCSV({
  outputData: namesWithCitiesInside,
  outputFile: './metadata/names-with-cities-inside.csv'
})
