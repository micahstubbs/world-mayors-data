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
    const filePath = `${dir}/${file}`
    if (linksAllListPages(filePath)) {
      // copy that file over to
      // page-links/bottom
      const source = filePath
      const destination = `./metadata/page-links/bottom/${file}`
      const callback = () => {
        console.log(`copied ${source} to ${destination}`)
      }
      fs.copyFile(source, destination, callback)
    }
  })
}

module.exports = sortPageLinksFiles
