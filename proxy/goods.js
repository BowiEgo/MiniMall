'use strict'
import _ from 'lodash'
import m from '../models'
import config from 'config'
import { logger } from '../util/logger'

const GoodsModel = m.Goods
const SpecModel = m.Spec

class Goods {
  /**
   * 新建一个商品
   * @param  {Object} body
   * @return {Promise.<Object>}
   */
  newAndSave(body = {}) {
    const goods = new GoodsModel(body)

    return goods.save()
  }

  /**
   * 更新一个商品
   * @param  {String} _id
   * @param  {Object} body
   * @return {Promise.<Object>}
   */
  update(_id, body = {}) {
    return GoodsModel.findByIdAndUpdate(_id, body)
  }

  /**
   * 根据_id查询商品
   * @param  {String} _id
   * @return {Promise.<Object>}
   */
  getById(_id) {
    return GoodsModel.findById({ _id: _id })
  }

  /**
   * 根据名字查询商品
   * @param  {String} name
   * @return {Promise.<Object>}
   */
  getByName(name) {
    return GoodsModel.findOne({ name: name })
  }

  /**
   * 根据类型查询商品
   * @param  {[String]} types
   * @return {Promise.<Object>}
   */
  getByTypes(types) {

  }

  /**
   * 模糊查询商品
   * @param  {String} keyword
   * @return {Promise.<Array>}
   */
  fuzzySearch(keyword) {
    return GoodsModel.find({
      '$or': [
        {name: { $regex: keyword, $options: 'i' }},
        {types: { $regex: keyword, $options: 'i' }}
      ]
    })
  }

  /**
   * 获取所有商品列表
   * @return {Promise.<Array>}    
   */
  getAll() {
    return GoodsModel.find()
  }

  /**
   * 获取商品列表分页
   * @param  {Number} start
   * @param  {Number} num
   * @return {Promise.<Array>}    
   */
  getByPages(start, num) {
    // return GoodsModel.find()
  }

  /**
   * 获取商品规格信息
   * @param  {String} goodsId
   * @return {Promise.<Array>} 
   */
  getSpec(goodsId) {
    let SpecList = SpecModel.find({goods_id: goodsId})
    logger.info('SpecList', SpecList)
  }
}

export default new Goods()
