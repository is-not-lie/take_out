import { http } from '@api'
import { isFun } from '@utils/types'
import { cartStorage } from '@utils/storage/user'

// 获取首页商家列表
export const getShopsList = async ({ commit, state }, data) => {
  const { pageNum, callback } = data
  const { list } = state.shopsList
  const shopsList = await http.reqShopsList(pageNum)
  if (shopsList) {
    shopsList.list = list ? [...list, ...shopsList.list] : [...shopsList.list]
    commit('COMMIT', { key: 'shopsList', val: shopsList })
    isFun(callback) && callback(shopsList)
  }
}
// 获取商家商品列表
export const getShopGoods = async ({ commit }, data) => {
  const { shopId, callback } = data
  const goods = await http.reqShopGoods(shopId)
  if (goods) {
    commit('COMMIT', { key: 'shopGoods', val: goods })
    isFun(callback) && callback(goods)
  }
}
// 获取商家评论
export const getShopComments = async ({ commit }, data) => {
  const { shopId, callback } = data
  const comments = await http.reqShopComments(shopId)
  if (comments) {
    commit('COMMIT', { key: 'comments', val: comments })
    isFun(callback) && callback(comments)
  }
}
// 获取商家详情信息
export const getShopInfo = async ({ commit }, data) => {
  const { shopId, callback } = data
  const shopInfo = await http.reqShopInfo(shopId)
  if (shopInfo) {
    commit('COMMIT', { key: 'shopInfo', val: shopInfo })
    isFun(callback) && callback(shopInfo)
  }
}
// 更新购物车
export const updateCart = ({ commit, state }, food) => {
  const { userCart } = state
  if (userCart.indexOf(food) === -1) {
    userCart.push(food)
  } else {
    userCart[userCart.indexOf(food)] = food
  }
  cartStorage.set(userCart)
  commit('COMMIT', { key: 'userCart', val: userCart })
}
