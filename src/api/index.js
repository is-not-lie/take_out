import axios from './http'
import { PAGE_SIZE } from '@config'

export const http = {
  // 请求首页分类导航数据
  reqCategory: () => axios.get('/category'),
  // 请求首页商家列表数据
  reqShopsList: (pageNum) => axios.get('/shops/list', { params: { pageNum, pageSize: PAGE_SIZE } }),
  // 请求svg验证码
  reqCaptcha: () => axios.get('/captcha'),
  // 请求发送手机验证码
  reqSendCode: (phone) => axios.get('/sendcode', { params: { phone } }),
  // 请求注册
  reqSingIn: ({ username, password, phone }) => axios.post('/signin', { username, password, phone }),
  // 请求登录
  reqLogin: (params) => axios.post('/login', params),
  // 请求城市信息数据
  reqCity: () => axios.get('/city'),
  // 请求用户订单数据
  reqOrder: (userId) => axios.post('/order', { userId }),
  // 请求商家详情信息数据
  reqShopInfo: () => axios.get('/shops/info'),
  // 请求商家评论数据
  reqShopComments: (shopId) => axios.get('/shops/comments', { params: { shopId } })
}
