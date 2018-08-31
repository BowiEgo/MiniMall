'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  name: String,
  id: String,
  goods_id: String,
  spec_list: Array,
  create_at: {
    type: Date,
    default: Date.now
  },
  update_at: Date
})
// schema.index({ name: 1 }, { unique: true })
module.exports = mongoose.model('Spec', schema)
