const sortPageLinksFiles = require('./src/sort-page-links-files.js')

const outputDir = './metadata/page-links/region'
const toExamineDir = './metadata/page-links/to-examine-regions'
const outputCategoryLinksFile = './metadata/sub-region-category-links.json'
sortPageLinksFiles({
  outputDir,
  toExamineDir,
  outputCategoryLinksFile
})
