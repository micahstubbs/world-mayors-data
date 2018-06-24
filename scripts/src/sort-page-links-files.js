const fs = require('fs')
const rimraf = require('rimraf')

const isJSONFile = require('./utils/is-json-file.js')
const classifyLinks = require('./classify-links.js')
const writeJSON = require('./utils/write-json.js')

function sortPageLinksFiles(props) {
  // first delete to-examine directory from old runs
  const {
    outputDir,
    toExamineDir,
    outputCategoryLinksDir,
    outputCategoryLinksFile
  } = props
  if (fs.existsSync(toExamineDir)) {
    rimraf.sync(toExamineDir)
  }

  // then create new to-examine directory
  fs.mkdirSync(toExamineDir)

  // read all filenames in directory
  // keep names of only json files
  let files = fs.readdirSync(outputDir).filter(file => isJSONFile(file))
  // console.log('files', files)

  let allCategoryPageLinks = []

  // if filename contains links
  // that all point to list pages
  files.forEach(file => {
    const filePath = `${outputDir}/${file}`
    const { listPageLinks, categoryPageLinks, otherLinks } = classifyLinks(
      filePath
    )

    if (listPageLinks && listPageLinks.length > 0) {
      const outputPath = './metadata/page-links/bottom'
      writeJSON(listPageLinks, outputPath, file)
    }

    if (categoryPageLinks && categoryPageLinks.length > 0) {
      allCategoryPageLinks = allCategoryPageLinks.concat(categoryPageLinks)
    }

    if (otherLinks && otherLinks.length > 0) {
      const outputPath = toExamineDir
      writeJSON(otherLinks, outputPath, file)
    }
  })

  const outputPath = './metadata'
  const filename = 'region-category-links.json'
  writeJSON(
    allCategoryPageLinks,
    outputCategoryLinksDir,
    outputCategoryLinksFile
  )
}

module.exports = sortPageLinksFiles
