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
