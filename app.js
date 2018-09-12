const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const jwt = require('koa-jwt')
const logger = require('koa-logger')
const cors = require('koa-cors')
const router = require('./routes/index')()
const secret = require('./config/secret')
const verify = require('./middlreware/verify')
const rest = require('./util/rest')
const path = require('path')
// error handler
onerror(app)

app.use(verify())
app.use(cors())

// 过滤不用jwt验证
app.use(jwt({secret: secret.sign}).unless({
    path: [
        /^\/stylesheets\/style\.css/,
        ///^\/api\/v1\/user\/list/,
        /^\/api\/v1\/user\/sign_[up|in]/,
        /^\/api\/v1\/user\/login/,
        /^((?!\/api).)*$/, //设置除了私有接口外的其它资源，可以不需要认证访问
    ]
}))

// middlewares
app.use(bodyparser({
    enableTypes: [
        'json',
        'form',
        'text'
    ]
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(path.resolve(__dirname, 'public')))

app.use(views(path.resolve(__dirname, 'views'), {
    extension: 'pug'
}))

// logger
app.use(async(ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
// bind .rest() for ctx:
app.use(rest.restify())
// routes
app.use(router.routes(), router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})
module.exports = app
