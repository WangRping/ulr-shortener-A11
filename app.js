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
  const getUrl = req.body.url
  async function dosmothing() {
    const checkUrlBoolean = await checkUrl(getUrl)
    if (checkUrlBoolean) {

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})