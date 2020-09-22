import { http } from '@api'
// 手机号码校验规则
const phoneRex = /^1[34578]\d{9}$/g
// 储存手机验证码与发送验证码的手机号
let code = ''
let userPhone = ''
// 储存svg验证码
let svgText = ''
// 手机号码校验失败提示信息
const phoneErrMsg = {
  empty: '手机号不能为空',
  format: '手机号格式错误',
  inconformity: '手机号码不一致'
}
// 验证码校验失败提示信息
const codeErrMsg = '验证码输入错误'
// 密码校验失败提示信息
const pwdErrMsg = {
  empty: '密码不能为空',
  min: '密码长度不能少于6位',
  max: '密码长度不能超过16位'
}
// 用户名校验失败提示信息
const userNameErrMsg = {
  empty: '用户名不能为空',
  min: '用户名长度不能少于4位',
  max: '用户名长度不能超过12位'
}
// svg验证码校验函数
const captchaVerify = (captcha) => new Promise((resolve, reject) => {
  if (captcha !== svgText) reject(codeErrMsg)
  else resolve()
})

// 手机验证码校验函数
const codeVerify = (captcha) => new Promise((resolve, reject) => {
  if (captcha !== code) reject(codeErrMsg)
  else resolve()
})

// 手机号码校验函数
const phoneVerify = (phone) => new Promise((resolve, reject) => {
  if (phone.trim() === '') reject(phoneErrMsg.empty)
  else if (phone !== userPhone) reject(phoneErrMsg.inconformity)
  else if (!phoneRex.test(phone)) reject(phoneErrMsg.format)
  else resolve()
})

// 密码校验函数
const pwdVerify = (pwd) => new Promise((resolve, reject) => {
  if (pwd.trim() === '') reject(pwdErrMsg.empty)
  else if (pwd.length < 6) reject(pwdErrMsg.min)
  else if (pwd.length > 16) reject(pwdErrMsg.max)
  else resolve()
})

// 用户名校验函数
const userNameVerify = (userName) => new Promise((resolve, reject) => {
  if (userName.trim() === '') reject(userNameErrMsg.empty)
  else if (userName.length < 6) reject(userNameErrMsg.min)
  else if (userName.length > 12) reject(userNameErrMsg.max)
  else resolve()
})

// 登录校验函数
export const loginVerify = ({ phone, code, username, password, captcha }) => new Promise((resolve, reject) => {
  if (username) {
    Promise.all([userNameVerify(username), pwdVerify(password), captchaVerify(captcha)])
      .then(resolve)
      .catch(reject)
  } else {
    Promise.all([phoneVerify(phone), codeVerify(code)])
      .then(resolve)
      .catch(reject)
  }
})

// 注册校验函数
export const signInVerify = ({ username, password, phone, code }) => new Promise((resolve, reject) => {
  Promise.all([
    userNameVerify(username),
    pwdVerify(password),
    phoneVerify(phone),
    codeVerify(code)
  ])
    .then(resolve)
    .catch(reject)
})

// 获取svg验证码函数
export const captcha = (time, callback) => {
  let timer = null
  return () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(async () => {
      const svg = await http.reqCaptcha()
      if (svg) {
        svgText = svg.text.toLowerCase()
        callback(svg.data)
      }
      timer = null
    }, time)
  }
}

// 发送手机验证码函数
export const sendCode = (timeOut = 60000) => {
  let timeOutKey = null
  return async (phone, callback) => {
    userPhone = phone
    clearTimeout(timeOutKey)
    const captcha = await http.reqSendCode(phone)
    if (captcha) {
      code = captcha
      timeOutKey = setTimeout(() => { code = '' }, timeOut)
      callback(code)
    } else callback()
  }
}
