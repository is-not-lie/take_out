import { http } from '@api'
import {
  COMMIT_LOGINOUT,
  COMMIT_LOGIN,
  COMMIT_CITY,
  COMMIT_ORDER,
  COMMIT_COMMENTS,
  COMMIT_SHOPSLIST,
  COMMIT_CATELIST
} from './type'
import Storage from '@utils/storage'
const user = new Storage('user')

export default {
  // 登录
  async login ({ commit }, data) {
    const { params, callback } = data
    const result = await http.reqLogin(params)
    if (result) {
      commit(COMMIT_LOGIN, result)
      user.set(result)
      callback instanceof Function && callback()
    }
  },
  // 注册
  async signIn ({ commit }, data) {
    const { params, callback } = data
    const result = await http.reqSingIn(params)
    if (result) {
      commit(COMMIT_LOGIN, result)
      user.set(result)
      callback instanceof Function && callback()
    }
  },
  // 退出登录
  loginOut ({ commit }) {
    user.del()
    commit(COMMIT_LOGINOUT)
  },
  // 获取城市信息
  async getCity ({ commit }, callback) {
    const citys = await http.reqCity()
    citys && commit(COMMIT_CITY, citys[0])
    callback instanceof Function && callback(citys[0])
  },
  // 获取用户订单
  async getOrder ({ commit }, data) {
    const { userId, callback } = data
    const { orderList } = await http.reqOrder(userId)
    orderList && commit(COMMIT_ORDER, orderList)
    callback instanceof Function && callback(orderList)
  },
  // 获取首页商家列表
  async getShopsList ({ commit }, data) {
    const { pageNum, callback } = data
    const shopsList = await http.reqShopsList(pageNum)
    shopsList && commit(COMMIT_SHOPSLIST, shopsList)
    callback instanceof Function && callback(shopsList)
  },
  // 获取商家评论
  async getShopComments ({ commit }, data) {
    const { shopId, callback } = data
    const comments = await http.reqShopComments(shopId)
    comments && commit(COMMIT_COMMENTS, comments)
    callback instanceof Function && callback(comments)
  },
  // 获取分类列表
  async getCategorys ({ commit }, callback) {
    const categorys = await http.reqCategorys()
    categorys && commit(COMMIT_CATELIST, categorys)
    callback instanceof Function && callback(categorys)
  }
}
