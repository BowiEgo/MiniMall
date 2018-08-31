'use strict'
import _ from 'lodash'
import m from '../models'
import config from 'config'
import { logger } from '../util/logger'

const SpecModel = m.Spec

class Spec {
  /**
   * 新建一个商品规格
   * @param  {Object} body
   * @return {Promise.<Object>}
   */
  newAndSave(body = {}) {
    const goods = new SpecModel(body)

    return goods.save()
  }

  /**
   * 更新一个商品规格
   * @param  {String} _id
   * @param  {Object} body
   * @return {Promise.<Object>}
   */
  update(_id, body = {}) {
    return SpecModel.findByIdAndUpdate(_id, body)
  }

  /**
   * 删除一个商品规格
   * @param  {String} _id
   * @param  {Object} body
   * @return {Promise.<Object>}
   */
  remove(_id, body = {}) {
    return SpecModel.findByIdAndRemove(_id, body)
  }

  /**
   * 根据_id查询商品规格
   * @param  {String} _id
   * @return {Promise.<Object>}
   */
  getById(_id) {
    return SpecModel.findById({ _id: _id })
  }

  /**
   * 根据名字查询商品规格
   * @param  {String} name
   * @return {Promise.<Object>}
   */
  getByName(name) {
    return SpecModel.findOne({ name: name })
  }

  /**
   * 根据类型查询商品规格
   * @param  {[String]} types
   * @return {Promise.<Object>}
   */
  getByTypes(types) {
  }

  /**
   * 模糊查询商品规格
   * @param  {String} keyword
   * @return {Promise.<Array>}
   */
  fuzzySearch(keyword) {
    return SpecModel.find({
      '$or': [
        {name: { $regex: keyword, $options: 'i' }},
        {types: { $regex: keyword, $options: 'i' }}
      ]
    })
  }

  /**
   * 获取所有商品规格列表
   * @return {Promise.<Array>}    
   */
  getAll() {
    return SpecModel.find()
  }
}

export default new Spec()
