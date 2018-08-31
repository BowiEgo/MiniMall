'use strict'

import mongoose from 'mongoose'
import config from 'config'

import User from './user'
import Goods from './goods'
import Category from './category'
import CategoryItem from './category-item'

/* ? */
mongoose.Promise = global.Promise

const uri = `mongodb://127.0.0.1:27017/${config.get('db')}`
const database = 
mongoose.connect(uri, {
  useMongoClient: true
})

database.then(
  () => {
    console.log(`connect to db ${config.get('db')} successed`)
  },
  err => {
    console.error('connect to $s error: ', config.get('db'), err.message)
    /* ? */
    process.exit(1)
  }
)

export default {
  User,
  Goods,
  Category,
  CategoryItem
}
