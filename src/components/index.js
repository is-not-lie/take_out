// 统一注册组件
// 公共组件
import FooterBar from './common/FooterBar.vue'
import HeaderBar from './common/HeaderBar.vue'
// home组件
import CategoryMenu from './home/CategoryMenu.vue'
import HomeMain from './home/Main.vue'
import Star from './home/Star.vue'

const components = [FooterBar, HeaderBar, CategoryMenu, HomeMain, Star]

export default Vue => components.forEach(component => Vue.component(component.name, component))
