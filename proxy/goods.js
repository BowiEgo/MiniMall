'use strict'
import _ from 'lodash'
import m from '../models'
import config from 'config'

const GoodsModel = m.Goods

/**
 * 新建一个商品
 * @param  {Object} body
 * @return {Function}
*/
const newAndSave = (body = {}) => {
  const goods = new GoodsModel(body)

  return goods.save()
}

/**
 * 更新一个商品
 * @param  {String} _id
 * @param  {Object} body
 * @return {Function}
*/
const update = (_id, body = {}) => {
  return GoodsModel.findByIdAndUpdate(_id, body)
}

/**
 * 根据_id查询商品
 * @param  {String} _id
 * @return {Function}
 */
const getById = (_id) => {
  return GoodsModel.findById({_id: _id })
}

/**
 * 根据名字查询商品
 * @param  {String} name
 * @return {Function}
 */
const getByName = (name) => {
  return GoodsModel.findOne({ name: name })
}

/**
 * 根据类型查询商品
 * @param  {[String]} types
 * @return {Function}
 */
const getByTypes = (types) => {

}

/**
 * 模糊查询商品
 * @param  {String} keyword
 * @return {Function}
 */
const fuzzySearch = (keyword) => {
  return GoodsModel.find({
    '$or': [
      {name: { $regex: keyword, $options: 'i' }},
      {types: { $regex: keyword, $options: 'i' }}
    ]
  })
}

/**
 * 获取所有商品列表
 * @return {Function}    
 */
const getAll = () => {
  return GoodsModel.find()
}

/**
 * 获取商品列表分页
 * @param  {Number} start
 * @param  {Number} num
 * @return {Function}    
 */
const getByPages = (start, num) => {
  // return GoodsModel.find()
}

export default {
  newAndSave,
  update,
  getById,
  getByName,
  getByTypes,
  fuzzySearch,
  getAll,
  getByPages
}
