const sortPageLinksFiles = require('./src/sort-page-links-files.js')

const outputDir = './metadata/page-links/subregion'
const toExamineDir = './metadata/page-links/to-examine-subregions'
const outputCategoryLinksFile = './metadata/sub-subregion-category-links.json'
sortPageLinksFiles({
  outputDir,
  toExamineDir,
  outputCategoryLinksFile
})
