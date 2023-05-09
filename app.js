const express = require('express')
const exphbs = require('express-handlebars')

const port = 3000
const app = express()

if (!process.env.NODE_ENV !== 'produciton') { require('dotenv').config() }



app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})