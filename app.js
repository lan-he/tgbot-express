var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

const { Bot, webhookCallback } = require('grammy')
const bot = new Bot('6772177688:AAFacMKVgf450O65E3wVVFglSPcY4Tlwox0') // 将 YOUR_TELEGRAM_BOT_TOKEN 替换为您的 API Token
// bot.command('start', (ctx) => ctx.reply('欢迎使用我的 Telegram 机器人！'))

bot.command('start', (ctx) => {
    ctx.reply(
        '欢迎使用我的 Telegram 机器人！点击以下链接访问：<a href="https://app.hotfi.io/">打开链接</a>',
        { parse_mode: 'HTML' }
    )
})

bot.on('message', (ctx) => ctx.reply('您发送了消息：' + ctx.message.text))

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
// sss
app.use(webhookCallback(bot, 'express'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
