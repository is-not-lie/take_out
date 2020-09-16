import { COMMIT_LOGINOUT, COMMIT_LOGIN, COMMIT_CITY } from './type'
export default {
  [COMMIT_LOGINOUT] (state) {
    state.user = {}
  },
  [COMMIT_LOGIN] (state, user) {
    state.user = user
  },
  [COMMIT_CITY] (state, citys) {
    state.citys = citys
  }
}
