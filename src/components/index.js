// 统一注册组件
// 公共组件
import FooterBar from './common/FooterBar.vue'
import HeaderBar from './common/HeaderBar.vue'
import Star from './home/Star.vue'
import Loding from './common/Loding.vue'
import Menu from './common/Menu.vue'
import Seach from './common/Seach.vue'
import Shop from './common/Shop.vue'
import Sort from './common/Sort.vue'
import Filter from './common/Filter/Filter.vue'
// home组件
import CategoryMenu from './home/CategoryMenu.vue'
import HomeMain from './home/Main.vue'

const components = [
  FooterBar,
  HeaderBar,
  CategoryMenu,
  HomeMain,
  Star,
  Loding,
  Menu,
  Seach,
  Shop,
  Sort,
  Filter
]

export default Vue => components.forEach(component => Vue.component(component.name, component))
