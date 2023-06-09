const mongoose = require('mongoose')
const Schema = mongoose.Schema
const urlSchma = new Schema({
  originUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String
  }
})

module.exports = mongoose.model('Url', urlSchma)