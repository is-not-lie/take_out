import { http } from '@api'
import { COMMIT_SIGNIN } from './type'
import Storage from '@utils/storage'
const user = new Storage('user')

export default {
  async signIn ({ commit }, data) {
    const result = await http.reqSingIn(data)
    if (result) {
      commit(COMMIT_SIGNIN, result)
      user.set(result)
    }
  }
}
