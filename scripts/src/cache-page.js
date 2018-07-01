const fs = require('fs')
const insertJSON = require('./utils/insert-json.js')
const getPageFileName = require('./get-page-file-name.js')

function cachePage({ uri, body }) {
  // create the cache if it does not already exist
  if (!fs.existsSync('../cache')) {
    fs.mkdirSync('../cache')
  }
  // write out body to file in cache
  const pageFileName = getPageFileName(uri)
  const pageFilePath = `../cache/${pageFileName}`
  fs.writeFileSync(pageFilePath, body)
  console.log(`wrote ${pageFilePath}`)

  // write filename to index.json in cache

  const indexFilePath = '../cache/index.json'
  if (!fs.existsSync(indexFilePath)) {
    fs.writeFileSync(indexFilePath, JSON.stringify({}))
  }
  const cacheIndexEntry = {
    key: uri,
    value: { pageFileName, timestamp: new Date().toISOString() }
  }
  insertJSON({ data: cacheIndexEntry, filePath: '../cache/index.json' })
}

module.exports = cachePage
