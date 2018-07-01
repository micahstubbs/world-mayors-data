const fs = require('fs')
function insertJSON(data, filePath) {
  let existingData
  if (fs.existsSync(filePath)) {
    existingData = JSON.parse(fs.readFileSync(filePath))
  }

  // figure out what existingData is
  if (typeof existingData === 'undefined') {
    existingData = []
  }
  if (Array.isArray(existingData)) {
    existingData.push(data)
  } else if (typeof existingData === 'object') {
    existingData[data.key] = data.value
  }
  const outputData = existingData
  fs.writeFileSync(filePath, JSON.stringify(outputData, null, 2))
  console.log(`inserted ${JSON.stringify(data)} into ${filePath}`)
}

module.exports = insertJSON
