const fs = require('fs')
const rp = require('request-promise')
const cheerio = require('cheerio')
const writeJSON = require('./utils/write-json.js')

// target
// https://en.wikipedia.org/wiki/Category:Lists_of_mayors

const inputFile = './metadata/subcategory-links.json'
const subcategoryLinks = JSON.parse(fs.readFileSync(inputFile, 'utf8'))

subcategoryLinks.some((link, i) => {
  const uriStem = 'https://en.wikipedia.org'
  const uri = `${uriStem}${link}`
  let place
  if (i === 0) place = 'Switzerland'
  else place = link.split('in_')[1]
  const transform = body => cheerio.load(body)

  const options = {
    uri,
    transform
  }

  rp(options)
    .then($ => {
      const result = $('.mw-category-generated li')
        .map((i, el) => {
          return $(el)
            .find('a')
            .attr('href')
        })
        .get()

      // filter for known good patterns
      // /wiki/Mayor_of_
      // /wiki/List_of_mayors_of_

      console.log('result', result)
      writeJSON(
        result,
        './metadata/page-links/country',
        `${place}-page-links.json`
      )
    })
    .catch(error => {
      console.error(error)
    })

  // early stopping for dev mode
  // if (i > 2) return true
})
