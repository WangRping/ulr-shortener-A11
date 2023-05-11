const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const Url = require('./models/url')
const checkUrl = require('./models/check_url')
const generateUrl = require('./models/generate_url')

const port = 3000
const app = express()

if (process.env.NODE_ENV !== 'produciton') { require('dotenv').config() }

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/create', (req, res) => {
  async function dosmothing() {
    const getUrl = req.body.url
    if (getUrl === '') { return res.send('缺少URL') }

    const checkUrlBoolean = await checkUrl(getUrl)
    if (checkUrlBoolean) {
      return Url.find({ originUrl: getUrl })
        .lean()
        .then(url => {
          const shortUrl = url[0].shortUrl
          res.redirect(`result/${shortUrl}`)
        })

    } else if (!checkUrlBoolean) {
      const newShortUrl = await generateUrl()
      console.log(newShortUrl, getUrl)
      return Url.create({ originUrl: getUrl, shortUrl: newShortUrl })
        .then(() => {
          res.redirect(`/result/${newShortUrl}`)
        })
    }
  }
  dosmothing()
})

app.get('/result/:shortUrl', (req, res) => {
  const shortUrl = req.params.shortUrl
  res.render('result', { shortUrl })
})

app.get('/shortener/:shortUrl', (req, res) => {
  const getShortUrl = req.params.shortUrl
  return Url.find({ shortUrl: getShortUrl })
    .lean()
    .then(url => {
      res.redirect(url[0].originUrl)
    })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})