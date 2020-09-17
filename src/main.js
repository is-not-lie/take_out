import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MyComponents from './components'
import '@utils/rem'
import '@utils/mock'

createApp(App).use(store).use(router).use(MyComponents).mount('#app')
