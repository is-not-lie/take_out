import { http } from '@api'
import { userStorage } from '@utils/storage/user'
import { isFun } from '@utils/types'

// 用户注册与登录
export const login = async ({ commit }, data) => {
  const { params, callback, type } = data
  const user = type === 'login' ? await http.reqLogin(params) : await http.reqSingIn(params)
  if (user) {
    commit('COMMIT', { key: 'user', val: user })
    userStorage.set(user)
    isFun(callback) && callback()
  }
}
// 退出登录
export const loginOut = ({ commit }) => {
  userStorage.del()
  commit('COMMIT', { key: 'user', val: {} })
}
