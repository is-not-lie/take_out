import { http } from '@api'
import { isFun } from '@utils/types'

// 获取首页商家列表
export const getShopsList = async ({ commit }, data) => {
  const { pageNum, callback } = data
  const shopsList = await http.reqShopsList(pageNum)
  if (shopsList) {
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
