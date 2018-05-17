'use strict'
import p from '../proxy'
import _ from 'lodash'
import util from '../util'
import ft from '../models/fields_table'

const goodsProxy = p.Goods

const post = async (ctx, next) => {
  const name = ctx.checkBody('name').notEmpty().value
  const types = ctx.checkBody('types').notEmpty().value
  const images = ctx.checkBody('images').value
  const price = ctx.checkBody('price').value
  const stock = ctx.checkBody('stock').value
  const remark = ctx.checkBody('remark').value
  
  if (ctx.errors) {
    let message = ctx.errors.map(item => {
      if (item.name === 'name can not be empty.') item.name = '商品名不能为空'
      if (item.types === 'types can not be empty.') item.types = '商品类型不能为空'
      return item
    })
    ctx.body = ctx.util.refail({ code: 10001, data: null, message: message })
    return
  }

  let goods = await goodsProxy.getByName(name)
  //判断商品是否已存在
  if (!_.isEmpty(goods)) {
    ctx.body = ctx.util.refail({ message: '新增失败，此商品名已存在' })
    return
  }

  const body = {
    name: name,
    types: types,
    images: images,
    price: price,
    stock: stock,
    remark: remark
  }

  await goodsProxy.newAndSave(body)
  
  goods = await goodsProxy.getByName(name)

  ctx.body = ctx.util.resuccess({data: _.pick(goods, ft.goods), message: '新增商品成功'})
}

const update = async (ctx, next) => {
  const _id = ctx.checkBody('_id').notEmpty().value
  let goods = await goodsProxy.getById(_id)
  //判断商品是否已存在
  if (_.isEmpty(goods)) {
    ctx.body = ctx.util.refail({ message: '失败，此_id商品不存在' })
    return
  }
  const data = ctx.checkBody('data').value
  const name = ctx.checkBody('#/data/name', true).get(0).notEmpty().value
  const types = ctx.checkBody('#/data/types', true).get(0).notEmpty().value
  const images = ctx.checkBody('#/data/images', true).get(0).value || ['']
  const price = ctx.checkBody('#/data/price', true).get(0).value || '0.00'
  const stock = ctx.checkBody('#/data/stock', true).get(0).value || 0
  const remark = ctx.checkBody('#/data/remark', true).get(0).value || ''

  if (ctx.errors) {
    let message = ctx.errors.map(item => {
      if (item.name === 'name can not be empty.') item.name = '商品名不能为空'
      if (item.types === 'types can not be empty.') item.types = '商品类型不能为空'
      return item
    })
    ctx.body = ctx.util.refail({ code: 10001, data: null, message: message })
    return
  }

  const body = {
    name: name,
    types: types,
    images: images,
    price: price,
    stock: stock,
    remark: remark,
    update_at: new Date()
  }

  await goodsProxy.update(_id, body)
  
  goods = await goodsProxy.getById(_id)

  ctx.body = ctx.util.resuccess({data: _.pick(goods, ft.goods), message: '更新商品成功'})

}

const search = async (ctx, next) => {
  const keyword = ctx.query['keyword']

  let goods = await goodsProxy.fuzzySearch(keyword)
  //判断商品是否已存在
  if (_.isEmpty(goods)) {
    ctx.body = ctx.util.refail({ message: '商品不存在' })
    return
  }

  ctx.body = ctx.util.resuccess({ data: goods.map(item => _.pick(item, ft.goods)), message: '查找成功' })
}

const all = async (ctx, next) => {
  let goods = await goodsProxy.getAll()

  ctx.body = ctx.util.resuccess({
    data: goods.map(item => _.pick(item, ft.goods)),
    message: '查找成功'
  })
}

export default {
  post,
  update,
  search,
  all
}