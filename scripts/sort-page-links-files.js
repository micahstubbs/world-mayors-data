const fs = require('fs')
const isJSONFile = require('./utils/is-json-file.js')
const classifyLinks = require('./classify-links.js')
const writeJSON = require('./utils/write-json.js')

function sortPageLinksFiles(dir) {
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
    } else {
      const outputPath = './metadata/page-links/to-examine'
      writeJSON(otherLinks, outputPath, file)
    }
  })
}

module.exports = sortPageLinksFiles
