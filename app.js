const http = require('http')
const Koa = require('koa')
const koaBody = require('koa-body')
const validate = require('koa-validate')

const middleware = require('./middlewares')
const routerConfig = require('./api')

const app = new Koa()

validate(app)
      
app
.use(koaBody())
.use(middleware.common)
.use(routerConfig.api.routes())
.use( async (ctx) => {
  ctx.body = "hello, this is bowiego's server"
})

const server = http.createServer(app.callback())

server.listen(3000, () => {
  console.log('Server listening at port 3000')
})