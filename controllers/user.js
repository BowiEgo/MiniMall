'use strict'
import p from '../proxy'
import _ from 'lodash'
import util from '../util'
import ft from '../models/fields_table'

const userProxy = p.User

const register = async (ctx, next) => {
  const name = ctx.checkBody('username').notEmpty().len(4, 20).value
  const password = ctx.checkBody('password').notEmpty().len(6, 20).value

  if (ctx.errors) {
    let message = ctx.errors.map(item => {
      if (item.username === 'username can not be empty.') item.username = '用户名不能为空'
      if (item.password === 'password can not be empty.') item.password = '密码不能为空'
      return item
    })
    ctx.body = ctx.util.refail({code: 10001, data: null, message: message})
    return
  }

  let user = await userProxy.getByName(name)
  //判断用户是否已存在
  if (!_.isEmpty(user)) {
    ctx.body = ctx.util.refail({message: '注册失败，用户已存在'})
    return
  }

  const npassword = await util.bhash(password)

  await userProxy.newAndSave(name, npassword)
  
  user = await userProxy.getByName(name)

  ctx.body = ctx.util.resuccess({data: _.pick(user, ft.user), message: '注册成功'})
}

const login = async (ctx, next) => {
  const name = ctx.checkBody('username').notEmpty().len(4, 20).value
  const password = ctx.checkBody('password').notEmpty().len(6, 20).value
  
  if (ctx.errors) {
    let message = ctx.errors.map(item => {
      if (item.username === 'username can not be empty.') item.username = '用户名不能为空'
      if (item.password === 'password can not be empty.') item.password = '密码不能为空'
      return item
    })
    ctx.body = ctx.util.refail({code: 10001, data: null, message: message})
    return
  }

  let user = await userProxy.getByName(name)
  // //判断用户是否已存在
  if (_.isEmpty(user)) {
    ctx.body = ctx.util.refail({message: [{username: '用户不存在'}]})
    return
  }

  // //验证密码
  const verifyPassword = await util.bcompare(password, user.password)

  if (!verifyPassword) {
    ctx.body = ctx.util.refail({message: [{password: '密码不正确'}]})
    return
  }

  // let token = await ctx.Token.list({
  //   id: user.id
  // })

  // if (_.isEmpty(token)) {
  //   token = [yield this.Token.create({ id: user.id })]
  // }

  // user.token = token[0].jwt
  
  ctx.body = ctx.util.resuccess({data: _.pick(user, ft.user), message: '登陆成功'})
}

const logout = async (ctx, next) => {
}

const search = async (ctx, next) => {
  const name = ctx.checkBody('username').notEmpty().len(4, 20).value

  let user = await userProxy.getByName(name)
  // //判断用户是否已存在
  if (_.isEmpty(user)) {
    ctx.body = ctx.util.refail({message: [{username: '用户不存在'}]})
    return
  }

  ctx.body = ctx.util.resuccess({data: _.pick(user, ft.user), message: '查找成功'})
}

const list = async (ctx, next) => {
  let user = await userProxy.getAll()

  ctx.body = ctx.util.resuccess({
    data: user.map(item => _.pick(item, ft.user)),
    message: '查找成功'
  })
}

export default {
  register,
  login,
  logout,
  search,
  list
}