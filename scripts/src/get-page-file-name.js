const filenamify = require('filenamify')

function getPageFileName(uri) {
  return `${filenamify(uri.replace(/https?:\/\/\w.*\.wikipedia\.org\//, ''), {
    replacement: '-'
  })}.html`
}

module.exports = getPageFileName
