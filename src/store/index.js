import { createStore } from 'vuex'
import actions from './actions'
import { userStorage, cartStorage } from '@utils/storage/user'

export default createStore({
  state: {
    user: userStorage.value,
    categoryMenu: [],
    citys: [],
    orderList: [],
    shopGoods: {},
    comments: {},
    shopInfo: {},
    shopsList: {},
    categorys: {},
    seachLabels: {},
    userCart: cartStorage.value
  },
  mutations: { COMMIT (state, { key, val }) { state[key] = val } },
  actions,
  modules: {
  }
})
