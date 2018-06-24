const fs = require('fs')
const isJSONFile = require('./utils/is-json-file.js')
const classifyLinks = require('./classify-links.js')
const writeJSON = require('./utils/write-json.js')
var rimraf = require('rimraf')

function sortPageLinksFiles(dir) {
  // first delete to-examine directory from old runs
  const toExamineDir = './metadata/page-links/to-examine'
  rimraf.sync(toExamineDir)

  // then create new to-examine directory
  if (!fs.existsSync(toExamineDir)) fs.mkdirSync(toExamineDir)

  // read all filenames in directory
  // keep names of only json files
  let files = fs.readdirSync(dir).filter(file => isJSONFile(file))
  // console.log('files', files)

  // if filename contains links
  // that all point to list pages
  files.forEach(file => {
    const filePath = `${dir}/${file}`
    const { listPageLinks, otherLinks } = classifyLinks(filePath)

    if (listPageLinks && listPageLinks.length > 0) {
      const outputPath = './metadata/page-links/bottom'
      writeJSON(listPageLinks, outputPath, file)
    }

    if (otherLinks && otherLinks.length > 0) {
      const outputPath = toExamineDir
      writeJSON(otherLinks, outputPath, file)
    }
  })
}

module.exports = sortPageLinksFiles