import Vue from 'vue'
import VueRouter from 'vue-router'
import Page from '../views/Page.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Page
  },
  {
    path: '/button',
    component: () => import('../views/Button.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
