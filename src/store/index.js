import { createStore } from 'vuex'
import actions from './actions'
import Storage from '@utils/storage'
const user = new Storage('user')

export default createStore({
  state: {
    user: user.value,
    categoryMenu: [],
    citys: [],
    orderList: [],
    shopGoods: {},
    comments: {},
    shopInfo: {},
    shopsList: {},
    categorys: {},
    seachLabels: {}
  },
  mutations: { COMMIT (state, { key, val }) { state[key] = val } },
  actions,
  modules: {
  }
})
