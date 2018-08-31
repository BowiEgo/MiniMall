'use strict'
import _ from 'lodash'
import m from '../models'
import config from 'config'
import ft from '../models/fields_table'
import { logger } from '../util/logger'

const CategoryModel = m.Category
const CategoryItemModel = m.CategoryItem

/**
 * 新添一个分类
 * @param  {Object} body
 * @return {Function}
*/
const newAndSave = (body = {}) => {
  CategoryItemModel.findOne({ id: body.parent_id }).then((doc) => {

    if (doc !== null) {
      body.level = doc.level + 1
      doc.attribute_ids.push(body.id)
      doc.save()
      body.path = doc.path + `${body.id}-`
    } else {
      body.path = body.id + '-'
    }

    return new CategoryItemModel(body).save()
  }).catch(err => {
    logger.error(err)
  })
}

/**
 * 更新一个分类
 * @param  {String} id
 * @param  {Object} body
 * @return {Function}
*/
const updateItem = (id, body = {}) => {
  return CategoryItemModel.findOneAndUpdate({ id: id }, body)
}

/**
 * 删除一个分类
 * @param  {String} id
 * @return {Function}
*/
const removeItem = async (id) => {
  let node = await CategoryItemModel.findOneAndRemove({ id: id })

  logger.info('node', node)
  CategoryItemModel.find({
    id: node.parent_id
  }).then(doc => {
    let parentNode = doc[0]
    logger.info('doc', parentNode)
    logger.info('index', parentNode.attribute_ids.indexOf(id))
    if(parentNode !== null) {
      parentNode.attribute_ids.splice(parentNode.attribute_ids.indexOf(id), 1)
      parentNode.save()
    }
  })

  await CategoryItemModel.find({
    level: { $eq: node.level + 1 },
    path: { $regex: node.path }
  }).remove()

  return node
}

/**
 * 根据id查询分类
 * @param  {String} id
 * @return {Function}
 */
const getItemById = (id) => {
  return CategoryItemModel.findOne({ id: id })
}

/**
 * 根据名字查询分类
 * @param  {String} name
 * @return {Function}
 */
const getItemByName = (name) => {
  return CategoryItemModel.findOne({ name: name })
}

/**
 * 模糊查询分类
 * @param  {String} keyword
 * @return {Function}
 */
const fuzzySearch = (keyword) => {
  return CategoryItemModel.find({
    '$or': [
      {name: { $regex: keyword, $options: 'i' }}
    ]
  })
}

/**
 * 获取所有分类列表
 * @return {Function}    
 */
const getAll = () => {
  return CategoryItemModel.find()
}

/**
 * 获取分类树结构
 * @return {Function}    
 */
const getTree = async () => {
  let result = []
  let rootNodes = await CategoryItemModel.find({ level: 0 })
  rootNodes = rootNodes.map(item => _.pick(item, ft.categoryItem))

  const grow = async (levelNodes) => {
    for (let i = 0, len = levelNodes.length; i < len; i++) {
      let item = levelNodes[i]
      let itemCopy = JSON.parse(JSON.stringify(item))
      let children = await CategoryItemModel.find({
        level: { $eq: itemCopy.level + 1 },
        path: { $regex: itemCopy.path }
      })

      children = children.map(item => _.pick(item, ft.categoryItem))
      if (children.length > 0) {
        children = await grow(children)
      }
      itemCopy.children = [...children]
      if (itemCopy.level === 0) {
        result.push(itemCopy)
      }
      levelNodes[i] = itemCopy
    }
    return levelNodes
  }

  await grow(rootNodes)
  return result
}

export default {
  newAndSave,
  updateItem,
  removeItem,
  getItemById,
  getItemByName,
  fuzzySearch,
  getAll,
  getTree
}
