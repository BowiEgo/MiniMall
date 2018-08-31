'use strict'
import p from '../proxy'
import _ from 'lodash'
import util from '../util'
import ft from '../models/fields_table'

const goodsProxy = p.Goods

const post = async (ctx, next) => {
  const name = ctx.checkBody('name').notEmpty().value
  const category = ctx.checkBody('category').notEmpty().value
  const title = ctx.checkBody('title').notEmpty().value
  const tags = ctx.checkBody('tags').notEmpty().value
  const price = ctx.checkBody('price').notEmpty().value
  const discount = ctx.checkBody('discount').notEmpty().value
  const stock = ctx.checkBody('stock').notEmpty().value
  const images = ctx.checkBody('images').notEmpty().value
  const detail = ctx.checkBody('detail').notEmpty().value
  const remark = ctx.checkBody('remark').notEmpty().value
  const specs = ctx.checkBody('specs').optional().len(0, 10).value

  if (ctx.errors) {
    let message = ctx.errors.map(item => {
      if (item.name === 'name can not be empty.') item.name = '商品名不能为空'
      if (item.category === 'category can not be empty.') item.category = '商品类型不能为空'
      if (item.title === 'title can not be empty.') item.title = '商品标题不能为空'
      if (item.tags === 'tags can not be empty.') item.tags = '商品标签不能为空'
      if (item.price === 'price can not be empty.') item.price = '商品价格不能为空'
      if (item.discount === 'discount can not be empty.') item.discount = '商品折扣不能为空'
      if (item.stock === 'stock can not be empty.') item.stock = '商品总量不能为空'
      if (item.preview === 'images can not be empty.') item.preview = '商品主图不能为空'
      if (item.images === 'images can not be empty.') item.images = '商品轮播图不能为空'
      if (item.detail === 'detail can not be empty.') item.detail = '商品详情不能为空'
      if (item.remark === 'remark can not be empty.') item.remark = '商品备注不能为空'
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
    category: category,
    title: title,
    tags: tags,
    price: price,
    discount: discount,
    stock: stock,
    preview: preview,
    images: images,
    detail: detail,
    remark: remark,
    specs: specs || [
      {
        id: '000',
        spec_list: ['001', '002', '003']
      }
    ]
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
  const category = ctx.checkBody('#/data/category', true).get(0).notEmpty().value
  const images = ctx.checkBody('#/data/images', true).get(0).value || ['']
  const price = ctx.checkBody('#/data/price', true).get(0).value || '0.00'
  const stock = ctx.checkBody('#/data/stock', true).get(0).value || 0
  const remark = ctx.checkBody('#/data/remark', true).get(0).value || ''

  if (ctx.errors) {
    let message = ctx.errors.map(item => {
      if (item.name === 'name can not be empty.') item.name = '商品名不能为空'
      if (item.category === 'category can not be empty.') item.category = '商品类型不能为空'
      return item
    })
    ctx.body = ctx.util.refail({ code: 10001, data: null, message: message })
    return
  }

  const body = {
    name: name,
    category: category,
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