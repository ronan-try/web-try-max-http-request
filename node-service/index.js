const Koa = require('koa')
const cors = require('koa2-cors')
const app = new Koa()

app.use(cors())
app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(ms)
})

app.use(async ctx => {
    await new Promise(resolve => {
        setTimeout(resolve, 1000 * 5)
    })
    ctx.body = 'hello koa'
})

app.listen(3000)
