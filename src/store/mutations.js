import { COMMIT_SIGNIN } from './type'
export default {
  [COMMIT_SIGNIN] (state, user) {
    state.user = user
  }
}
