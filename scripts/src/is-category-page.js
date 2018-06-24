function isCategoryPage(link) {
  const patterns = ['/wiki/Category:']
  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = new RegExp(patterns[i].toLowerCase())
    const found = pattern.test(link.toLowerCase())
    if (found) return true
  }
  return false
}

module.exports = isCategoryPage
