function isJSONFile(file) {
  const split = file.split('.')
  const extension = split[split.length - 1]
  if (extension === 'json') return true
  return false
}

module.exports = isJSONFile
