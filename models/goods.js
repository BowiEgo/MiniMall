'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const schema = new Schema({
  name: String,
  category: String,
  title: String,
  tags: [String],
  price: {
    type: String,
    default: '0.00'
  },
  discount: String,
  specs: Array,
  stock: {
    type: Number,
    default: 0
  },
  preview: String,
  images: [String],
  detail: String,
  remark: String,
  create_at: {
    type: Date,
    default: Date.now
  },
  update_at: Date,
})

module.exports = mongoose.model('Goods', schema)
