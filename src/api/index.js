import axios from './http'
import { PAGE_SIZE } from '@config'

export const http = {
  reqCategory: () => axios.get('/category'),
  reqShopsList: (pageNum) => axios.get('/shops/list', { params: { pageNum, pageSize: PAGE_SIZE } }),
  reqCaptcha: () => axios.get('/captcha'),
  reqSendCode: (phone) => axios.get('/sendcode', { params: { phone } }),
  reqSingIn: ({ username, password, phone }) => axios.post('/signin', { username, password, phone })
}
