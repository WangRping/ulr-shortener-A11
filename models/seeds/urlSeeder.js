const mongoose = require('mongoose')
const Url = require('../url') // 
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Url.create({ originUrl: 'https://www.google.com/', shortUrl: 'ggggg' })
  Url.create({ originUrl: 'https://www.youtube.com/', shortUrl: 'yyyy' })
  console.log('done')
})