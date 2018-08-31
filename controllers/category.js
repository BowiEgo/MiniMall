'use strict'
import p from '../proxy'
import _ from 'lodash'
import util from '../util'
import ft from '../models/fields_table'

const categoryProxy = p.Category
// const categoryItemProxy = p.CategoryItem

const post = async (ctx, next) => {
  const id = ctx.checkBody('id').notEmpty().value
  const name = ctx.checkBody('name').notEmpty().value
  const parentId = ctx.checkBody('parentId').value
  const remark = ctx.checkBody('remark').value
  
  if (id === parentId) {
    ctx.body = ctx.util.refail({ code: 10001, data: null, message: 'id不能与parentId相同' })
    return
  }
  if (ctx.errors) {
    let message = ctx.errors.map(item => {
      if (item.id === 'id can not be empty.') item.id = '分类id不能为空'
      if (item.name === 'name can not be empty.') item.name = '分类名不能为空'
      return item
    })
 
    ctx.body = ctx.util.refail({ code: 10001, data: null, message: message })
    return
  }

  let categoryItem = await categoryProxy.getItemById(id) || await categoryProxy.getItemByName(name)
  //判断商品是否已存在
  if (!_.isEmpty(categoryItem)) {
    ctx.body = ctx.util.refail({ message: '新增失败，此分类已存在' })
    return
  }

  const body = {
    id: id,
    name: name,
    level: 0,
    parent_id: parentId,
    remark: remark
  }

  await categoryProxy.newAndSave(body)
  
  let category = await categoryProxy.getAll()

  ctx.body = ctx.util.resuccess({data: _.pick(category, ft.category), message: '新增分类成功'})
}

const update = async (ctx, next) => {
  const id = ctx.checkBody('id').notEmpty().value
  let categoryItem = await categoryProxy.getItemById(id)
  //判断商品是否已存在
  if (_.isEmpty(categoryItem)) {
    ctx.body = ctx.util.refail({ message: '失败，此id分类不存在' })
    return
  }
  const name = ctx.checkBody('name').notEmpty().value
  const remark = ctx.checkBody('remark').value

  if (ctx.errors) {
    let message = ctx.errors.map(item => {
      if (item.id === 'id can not be empty.') item.id = '分类id不能为空'
      if (item.name === 'name can not be empty.') item.name = '分类名不能为空'
      return item
    })
    ctx.body = ctx.util.refail({ code: 10001, data: null, message: message })
    return
  }

  const body = {
    id: id,
    name: name,
    remark: remark,
    update_at: new Date()
  }

  await categoryProxy.updateItem(id, body)
  
  let category = await categoryProxy.getTree()
  ctx.body = ctx.util.resuccess({data: category, message: '更新分类成功'})
}

const remove = async (ctx, next) => {
  const id = ctx.checkBody('id').notEmpty().value

  if (ctx.errors) {
    let message = ctx.errors.map(item => {
      if (item.id === 'id can not be empty.') item.id = '分类id不能为空'
      return item
    })
 
    ctx.body = ctx.util.refail({ code: 10001, data: null, message: message })
    return
  }

  await categoryProxy.removeItem(id)

  let category = await categoryProxy.getTree()
  ctx.body = ctx.util.resuccess({data: category, message: '删除分类成功'})
}

const search = async (ctx, next) => {
  const keyword = ctx.query['keyword']

  let categoryItems = await categoryProxy.fuzzySearch(keyword)
  //判断商品是否已存在
  if (_.isEmpty(categoryItems)) {
    ctx.body = ctx.util.refail({ message: '分类不存在' })
    return
  }

  ctx.body = ctx.util.resuccess({ data: categoryItems.map(item => _.pick(item, ft.categoryItem)), message: '查找成功' })
}

const all = async (ctx, next) => {
  let category = await categoryProxy.getAll()

  ctx.body = ctx.util.resuccess({
    data: category.map(item => _.pick(item, ft.categoryItem)),
    message: '查找成功'
  })
}

const tree = async (ctx, next) => {
  let category = await categoryProxy.getTree()

  ctx.body = ctx.util.resuccess({
    data: category,
    message: '查找成功'
  })
}

export default {
  post,
  update,
  remove,
  search,
  all,
  tree
}