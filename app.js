import http from 'http'
import Koa from 'koa'
import koaBody from 'koa-body'
import validate from 'koa-validate'

import middleware from './middlewares'
import routerConfig from './api'

import { logger, logger_http } from './util/logger'

const app = new Koa()

validate(app)
console.log(111)
debugger
console.log(222)
app
// .use(logger_http)
.use(koaBody())
.use(middleware.common)
.use(routerConfig.api.routes())
.use( async (ctx) => {
  ctx.body = "hello, this is bowiego's server"
})

const server = http.createServer(app.callback())

server.listen(3000, () => {
  // console.log('Server listening at port 3000')
  logger.info('Server listening at port 3000')
})
