// writeJSON.js
const jf = require('jsonfile')
module.exports = function(data, path, filename) {
  jf.writeFile(`${path}/${filename}`, data, { spaces: 2 }, function(err) {
    if (err) console.error(err)
    console.log(`wrote ${path}/${filename}`)
  })
}
