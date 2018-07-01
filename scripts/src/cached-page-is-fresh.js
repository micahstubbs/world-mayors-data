function cachedPageIsFresh(timestamp) {
  const aYearAgo = new Date(
    new Date().setFullYear(new Date().getFullYear() - 1)
  )
  const cachedPageDate = new Date(timestamp)
  if (cachedPageDate > aYearAgo) return true
  return false
}

module.exports = cachedPageIsFresh

// TODO make these into proper tests
//
// console.log(
//   '2018-07-01T04:51:10.926Z',
//   cachedPageIsFresh('2018-07-01T04:51:10.926Z')
// )
// true
//
// console.log(
//   '2017-07-02T04:51:10.926Z',
//   cachedPageIsFresh('2017-07-02T04:51:10.926Z')
// )
// true
//
// console.log(
//   '2017-07-01T04:51:10.926Z',
//   cachedPageIsFresh('2017-07-01T04:51:10.926Z')
// )
// false
