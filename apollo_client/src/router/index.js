import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/books',
    name: 'Books',
    component: () => import('../views/Books.vue')
  },
  {
    path: '/reactivity-limitations',
    name: 'ReactivityLimitations',
    component: () => import('../views/ReactivityLimitations.vue')
  },
  {
    path: '/provide-inject',
    name: 'ProvideInject',
    component: () => import('../views/ProvideInject.vue')
  }
  // {
  //   path: '/reactivity-perfomance'
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
