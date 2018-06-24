const sortPageLinksFiles = require('./src/sort-page-links-files.js')

const outputDir = './metadata/page-links/country'
const toExamineDir = './metadata/page-links/to-examine'
const outputCategoryLinksFile = './metadata/region-category-links.json'
sortPageLinksFiles({
  outputDir,
  toExamineDir,
  outputCategoryLinksFile
})
