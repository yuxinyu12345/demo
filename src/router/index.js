import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Vmodel from '../views/Vmodel/son.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Vmodel
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/table',
    name: 'Table',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/El-table.vue')
  },
  {
    path: '/diglog',
    name: 'Diglog',
    component: () => import('../views/Diglog.vue')
  },
  {
    path: '/dynAddForm',
    name: 'DynAddForm',
    component: () => import('../views/DynAddForm.vue')
  },
  {
    path: '/MemoryLeak',
    name: 'MemoryLeak',
    component: () => import('../views/MemoryLeak.vue')
  },
  {
    path: '/bigimg',
    name: 'bigimg',
    component: () => import('../views/BigImg/index.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
