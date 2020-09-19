import { http } from '@api'
import { isFun } from '@utils/types'

// 获取分类列表
export const getCategorys = async ({ commit }, callback) => {
  const categorys = await http.reqCategorys()
  if (categorys) {
    commit('COMMIT', { key: 'categorys', val: categorys })
    isFun(callback) && callback(categorys)
  }
}
