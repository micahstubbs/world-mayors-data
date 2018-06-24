const fs = require('fs')
const rp = require('request-promise')
const cheerio = require('cheerio')
const writeJSON = require('./utils/write-json.js')

function scrapePageLinks(inputFile, outputDir) {
  // target
  // https://en.wikipedia.org/wiki/Category:Lists_of_mayors
  // check if outputDir exists, if not create it
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir)
  }

  const categoryLinks = JSON.parse(fs.readFileSync(inputFile, 'utf8'))

  categoryLinks.some((link, i) => {
    const uriStem = 'https://en.wikipedia.org'
    const uri = `${uriStem}${link}`

    // parse out place name
    // handle a few special cases
    let place
    if (link === '/wiki/Category:Lists_of_mayors_(complete_1900-2013)') {
      place = 'Switzerland'
    } else if (link === '/wiki/Category:Lists_of_mayors_of_Lima_by_district') {
      place = 'Lima'
    } else place = link.split('in_')[1]
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
        writeJSON(result, outputDir, `${place}-page-links.json`)
      })
      .catch(error => {
        console.error(error)
      })

    // early stopping for dev mode
    // if (i > 2) return true
  })
}

module.exports = scrapePageLinks
