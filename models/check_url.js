const Url = require('./url')
if (process.env.NODE_ENV !== 'produciton') { require('dotenv').config() }
require('../config/mongoose')

async function checkUrl(getUrl) {
  let savedOriginUrls = []
  await Url.find().lean().then(urls => urls.forEach(url => savedOriginUrls.push(url.originUrl)))

  return savedOriginUrls.includes(getUrl)
}

// function main(getUrl) {
//   console.log(`main取得:${getUrl}`)
//   Url.find()
//     .lean()
//     .then(urls => {
//       urls.forEach(url => savedOriginUrls.push(url.originUrl))
//       console.log(`main的回應:${checkUrl(getUrl, savedOriginUrls)}`)
//       return checkUrl(getUrl, savedOriginUrls)
//     })
// }

// function checkUrl(getUrl, savedOriginUrls) {
//   return savedOriginUrls.includes(getUrl)
// }

module.exports = checkUrl