import { http } from '@api'
import { isFun } from '@utils/types'

// 获取用户订单
export const getOrder = async ({ commit }, data) => {
  const { userId, callback } = data
  const { orderList } = await http.reqOrder(userId)
  if (orderList) {
    commit('COMMIT', { key: 'orderList', val: orderList })
    isFun(callback) && callback(orderList)
  }
}

export const delOrder = async ({ commit, state }, data) => {
  const { orderId, userId, callback } = data
  const result = await http.reqDelOrder({ orderId, userId })
  if (result) {
    const { orderList } = state
    orderList.splice(orderList.findIndex((order) => order.orderId === orderId), 1)
    commit('COMMIT', { key: 'orderList', val: orderList })
    isFun(callback) && callback(orderList)
  }
}
