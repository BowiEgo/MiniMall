'use strict'
// const config = require('config')

import router from 'koa-router'

/* controllers */
import user from '../controllers/user'
import goods from '../controllers/goods'

const api = router()
  .get('/api/user/list', user.list)
  .post('/api/user/login', user.login)
  .post('/api/user/logout', user.logout)
  .post('/api/user/register', user.register)
  .post('/api/user/search', user.search)

  .get('/api/goods/all', goods.all)
  .get('/api/goods/search', goods.search)
  .post('/api/goods/add', goods.post)
  .post('/api/goods/update', goods.update)

export default {
  api
}