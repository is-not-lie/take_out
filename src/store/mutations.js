import {
  COMMIT_LOGINOUT,
  COMMIT_LOGIN,
  COMMIT_CITY,
  COMMIT_ORDER,
  COMMIT_COMMENTS,
  COMMIT_SHOPSLIST,
  COMMIT_CATELIST
} from './type'
export default {
  // 退出登录
  [COMMIT_LOGINOUT] (state) {
    state.user = {}
  },
  // 提交登录用户信息
  [COMMIT_LOGIN] (state, user) {
    state.user = user
  },
  // 提交城市信息
  [COMMIT_CITY] (state, citys) {
    state.citys = citys
  },
  // 提交订单信息
  [COMMIT_ORDER] (state, orderList) {
    state.orderList = orderList
  },
  // 提交商家评论信息
  [COMMIT_COMMENTS] (state, comments) {
    state.comments = comments
  },
  // 提交首页商家列表数据
  [COMMIT_SHOPSLIST] (state, shopsList) {
    state.shopsList = shopsList
  },
  // 提交分类列表数据
  [COMMIT_CATELIST] (state, categorys) {
    state.categorys = categorys
  }
}
