const fs = require('fs')
const linksAllListPages = require('./links-all-list-pages')
const isJSONFile = require('./utils/is-json-file.js')

function sortPageLinksFiles(dir) {
  // read all filenames in directory
  // keep names of only json files
  let files = fs.readdirSync(dir).filter(file => isJSONFile(file))
  console.log('files', files)

  // if filename contains links
  // that all point to list pages
  files.forEach(file => {
    if (linksAllListPages(`${dir}/${file}`)) {
      // copy that file over to
      // page-links/bottom
    }
  })
}

module.exports = sortPageLinksFiles
