const mongoose = require('mongoose')
const express = require('express')
const { resolve } = require('path')
const cookieParser = require('cookie-parser')
const token = require('./utils/token')
const { DB_CONFIG, SERVER_CONFIG } = require('./config')
const app = express()

app.use(express.static(resolve(__dirname, './public')))
app.use(express.json())
app.use(cookieParser())
app.use(token)
app.use('/', require('./routers'))
mongoose.connect(`mongodb://${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.name}`, {
  useNewUrlParser: true
})
  .then(() => {
    console.log('数据库连接成功')
    app.listen(SERVER_CONFIG.port, () => {
      console.log(`服务器已启动,请访问: http://${SERVER_CONFIG.host}:${SERVER_CONFIG.port}`)
    })
  })
  .catch((err) => {
    console.error(`服务器启动失败,错误信息:${err}`)
  })
