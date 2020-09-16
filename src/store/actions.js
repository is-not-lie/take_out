import { http } from '@api'
import { COMMIT_LOGINOUT, COMMIT_LOGIN, COMMIT_CITY } from './type'
import Storage from '@utils/storage'
const user = new Storage('user')

export default {
  async login ({ commit }, data) {
    const { params, callback } = data
    const result = await http.reqLogin(params)
    if (result) {
      commit(COMMIT_LOGIN, result)
      user.set(result)
      callback instanceof Function && callback()
    }
  },
  async signIn ({ commit }, data) {
    const { params, callback } = data
    const result = await http.reqSingIn(params)
    if (result) {
      commit(COMMIT_LOGIN, result)
      user.set(result)
      callback instanceof Function && callback()
    }
  },
  loginOut ({ commit }) {
    user.del()
    commit(COMMIT_LOGINOUT)
  },
  async getCity ({ commit }) {
    const citys = await http.reqCity()
    citys && commit(COMMIT_CITY, citys[0])
  }
}
