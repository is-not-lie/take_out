import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'

const routes = [
  { path: '/', name: 'home', component: Home, meta: { showFooter: true } },
  { path: '/city', name: 'city', component: () => import('../views/city.vue') },
  { path: '/shopinfo/:id', name: 'shopinfo', component: () => import('../views/shopInfo.vue') },
  { path: '/pay', name: 'pay', component: () => import('../views/pay.vue') },
  { path: '/login', name: 'login', component: () => import('../views/login.vue') },
  { path: '/signin', name: 'signin', component: () => import('../views/signIn.vue') },
  { path: '/seach', name: 'seach', component: () => import('../views/seach.vue'), meta: { showFooter: true } },
  { path: '/order', name: 'order', component: () => import('../views/order.vue'), meta: { showFooter: true } },
  { path: '/order/info/:id', name: 'orderinfo', component: () => import('../views/orderInfo.vue') },
  { path: '/profile', name: 'profile', component: () => import('../views/profile.vue'), meta: { showFooter: true } },
  { path: '/position/:id', name: 'position', component: () => import('../views/position.vue') },
  { path: '/category/:id', name: 'category', component: () => import('../views/category.vue') }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
