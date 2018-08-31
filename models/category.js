'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const schema = new Schema({
  name: String,
  id: String,
  data: Array,
  level: Number,
  create_at: {
    type: Date,
    default: Date.now
  },
  update_at: Date
})
// schema.index({ name: 1 }, { unique: true })
module.exports = mongoose.model('Category', schema)
