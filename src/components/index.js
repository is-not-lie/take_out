// 统一注册公共组件
import FooterBar from './common/FooterBar.vue'
import Star from './common/Star.vue'
import Loding from './common/Loding.vue'
import FooterLoding from './common/FooterLoding.vue'
import SortMenu from './common/SortMenu/SortMenu.vue'
import Seach from './common/Seach.vue'
import Shop from './common/Shop.vue'

const components = [
  FooterBar,
  Star,
  Loding,
  SortMenu,
  Seach,
  Shop,
  FooterLoding
]

export default Vue => components.forEach(component => Vue.component(component.name, component))
