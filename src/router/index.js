import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/register/select-location',
    name: 'Map',
    component: () => import(/* webpackChunkName: "map" */ '../views/Map.vue'),
    beforeEnter: (to, from , next) => {
      if (from.name !== 'Register') next({name : 'Home'})
      else next();
    },
  },
  {
    path: "*",
    component: () => import('../views/PageNotFound.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
