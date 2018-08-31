'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const schema = new Schema({
  name: String,
  id: String,
  level: {
    type: Number,
    default: 0
  },
  path: String,
  parent_id: String,
  attribute_ids: Array,
  remark: {
    type: String,
    default: ''
  },
  create_at: {
    type: Date,
    default: Date.now
  },
  update_at: Date
})

// schema.index({ name: 1 }, { unique: true })
module.exports = mongoose.model('CategoryItem', schema)
