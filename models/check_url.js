const Url = require('./url')
if (process.env.NODE_ENV !== 'produciton') { require('dotenv').config() }
require('../config/mongoose')

let savedOriginUrls = []

function main(getUrl) {
  console.log(`main拿到的:${getUrl}`)
  Url.find()
    .lean()
    .then(urls => {
      urls.forEach(url => savedOriginUrls.push(url.originUrl))
      checkUrl(getUrl, savedOriginUrls)
    })
}

function checkUrl(getUrl, savedOriginUrls) {
  console.log(`---函式開始---`)
  console.log(savedOriginUrls)
  console.log(getUrl)
  console.log(savedOriginUrls.includes(getUrl))
  console.log(`---函式結束---`)
}

module.exports = main