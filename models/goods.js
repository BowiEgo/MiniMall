'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const schema = new Schema({
  name: String,
  types: [String],
  images: [String],
  price: {
    type: String,
    default: '0.00'
  },
  stock: {
    type: Number,
    default: 0
  },
  remark: String,
  create_at: {
    type: Date,
    default: Date.now
  },
  update_at: Date
})

// schema.index({ name: 1 }, { unique: true })
module.exports = mongoose.model('Goods', schema)
