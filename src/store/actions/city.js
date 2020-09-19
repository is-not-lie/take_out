import { http } from '@api'
import { isFun } from '@utils/types'
// 获取城市信息
export const getCity = async ({ commit }, callback) => {
  const citys = await http.reqCity()
  if (citys) {
    commit('COMMIT', { key: 'citys', val: citys[0] })
    isFun(callback) && callback(citys[0])
  }
}
