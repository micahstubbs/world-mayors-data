const fs = require('fs')
const open = require('open')

const inputDir = './metadata/page-links/bottom'
const pagesFile = 'California-page-links.json'
const pageLinksFilePath = `${inputDir}/${pagesFile}`
const pageLinks = JSON.parse(fs.readFileSync(pageLinksFilePath))

pageLinks.forEach(page => {
  // local mode
  const cleanedPage = page.replace(/wiki\//, 'wiki-')
  const uri = `http://127.0.0.1:8080/cache${cleanedPage}.html`
  open(uri, err => {
    if (err) throw err
  })
})
