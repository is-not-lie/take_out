// 数据库配置
const DB_CONFIG = {
  port: 27017,
  host: 'localhost',
  name: 'take_out'
}
// 服务器配置
const SERVER_CONFIG = {
  port: 4000,
  host: 'localhost'
}
// token校验的白名单
const CHECK_PATH = []

const TOKEN_KEY = 'take-out'

module.exports = { DB_CONFIG, SERVER_CONFIG, TOKEN_KEY, CHECK_PATH }
