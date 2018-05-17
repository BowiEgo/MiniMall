'use strict'
import _ from 'lodash'
import m from '../models'
import config from 'config'

const UserModel = m.User

/**
 * 新建一个用户
 * @param  {String} name
 * @param  {String} password
 * @param  {String} nickName
 * @param  {String} headImg
 * @return {Function}          
*/
const newAndSave = (name, password, nickName, headImg) => {
  const user = new UserModel()
  const len = config.get('gravatar').length

  user.name = name
  user.password = password
  user.nick_name = nickName || _.now()
  user.head_img = headImg || config.get('gravatar')[_.random(0, len - 1)]

  return user.save()
}

/**
 * 根据用户名查询一个用户
 * @param  {String} userName
 * @return {Function}    
 */
const getByName = (userName) => {
  console.log('getByName: ', userName)
  return UserModel.findOne({ name: userName })
}

/**
 * 根据userId查询一个用户
 * @param  {String} userId
 * @return {Function}
 */
const getById = (userId) => {
  return UserModel.findById(userId)
}

/**
 * 获取所有用户列表
 * @return {Function}    
 */
const getAll = () => {
  return UserModel.find()
}

export default {
  newAndSave,
  getByName,
  getById,
  getAll
}
