const sortPageLinksFiles = require('./src/sort-page-links-files.js')

const outputDir = './metadata/page-links/sub-subregion'
const toExamineDir = './metadata/page-links/to-examine-sub-subregions'
const outputCategoryLinksFile =
  './metadata/sub-sub-subregion-category-links.json'
sortPageLinksFiles({
  outputDir,
  toExamineDir,
  outputCategoryLinksFile
})
