require('dotenv').config()

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const webinaireSchema = new Schema({
  title:{
    type: String,
    required: true
  },
  description:{
    type: String,
    requiered: true
  },
  link:{
    type: String,
    required: true
  },
  date:{
    type: String,
    requiered: true
  },
  heure:{
    type: String,
    requiered: true
  },
})

module.exports = mongoose.model('Webinaire', webinaireSchema)