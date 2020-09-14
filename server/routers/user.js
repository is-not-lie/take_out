const userModel = require('../models/user')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const svgCaptcha = require('svg-captcha')
const sendCode = require('../utils/sendSms.js')
const { TOKEN_KEY } = require('../config')

// svgCaptcha.options =

module.exports = router => {
  router.post('/login', (req, res) => {
    const { username, password, phone } = req
    if (phone && !username) { }
    userModel.findOne({ username, password: md5(password) }, { password: 0, __v: 0 })
      .then(user => {
        if (user && user.length) {
          const token = jwt.sign({ id: user._id }, TOKEN_KEY, { expiresIn: '30 days' })
          res.send({ status: 200, data: { user, token } })
        } else res.send({ status: 0, msg: '用户名或密码不正确' })
      })
      .catch(err => {
        console.error(`查询用户信息异常,错误信息:${err}`)
        res.send({ status: 0, msg: '当前网络繁忙,请稍后重新尝试' })
      })
  })
  router.post('/signin', (req, res) => {
    const { username, password } = req.body
    userModel.findOne({ username })
      .then(data => {
        if (data && data.length) res.send({ status: 0, msg: '该用户已存在' })
        else return userModel.create({ ...req.body, password: md5(password) })
      })
      .then(data => data && res.send({ status: 200, data }))
      .catch(err => {
        console.error(`用户注册异常,错误信息:${err}`)
        res.send({ status: 0, msg: '当前网络繁忙,请稍后重新尝试' })
      })
  })
  // svg验证码
  router.get('/captcha', (req, res) => {
    const captcha = svgCaptcha.create({
      ignoreChars: '0o1i',
      noise: 1,
      background: '#FFD161',
      width: 100,
      height: 40,
      fontSize: 40
    })
    res.send({ status: 200, data: captcha })
  })
  // 发送短信验证码
  router.get('/sendcode', (req, res) => {
    const { phone } = req.query
    console.log(`向${phone}发送验证码短信`)
    sendCode({ phone })
      .then(result => {
        const { code, status } = result
        console.log(code)
        status === 200 && res.send({ status, data: code })
      })
      .catch(err => console.log(err))
  })
}
