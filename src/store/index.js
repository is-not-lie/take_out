import { createStore } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import Storage from '@utils/storage'
const user = new Storage('user')

export default createStore({
  state: {
    user: user.value,
    citys: []
  },
  mutations,
  actions,
  modules: {
  }
})
