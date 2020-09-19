import { http } from '@api'
import { isFun } from '@utils/types'

// 获取热门搜索leabel
export const getSeachLabels = async ({ commit }, callback) => {
  const seachLabels = await http.reqSeachLabels()
  if (seachLabels) {
    commit('COMMIT', { key: 'seachLabels', val: seachLabels[0] })
    isFun(callback) && callback(seachLabels[0])
  }
}
