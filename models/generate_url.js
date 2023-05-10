const Url = require('./url')
if (process.env.NODE_ENV !== 'produciton') { require('dotenv').config() }
require('../config/mongoose')

let savedShortUrls = []

Url.find()
  .lean()
  .then(url => {
    url.forEach(item => savedShortUrls.push(item.shortUrl))
    generateUrl()
  })

function generateUrl() {
  const qty = 5

  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  // let box = []
  // box = box.concat(lowerCaseLetters.split(''))
  // box = box.concat(upperCaseLetters.split(''))
  // box = box.concat(numbers.split(''))
  const box = [...lowerCaseLetters, ...upperCaseLetters, ...numbers]

  let randomCharacters = ''

  for (let i = 0; i < qty; i++) {
    randomCharacters += box[Math.floor(Math.random() * box.length)]
  }

  if (savedShortUrls.includes(randomCharacters)) {
    generateUrl()
  } else {
    return randomCharacters
  }
}

module.exports = generateUrl