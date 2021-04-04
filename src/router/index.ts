import { createRouter, createWebHistory, onBeforeRouteUpdate, RouteRecordRaw } from 'vue-router'
import Home from '../views/home/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/catagory',
    name: 'Catagory',
    component: () => import( '../views/catagory/Catagory.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import( '../views/cart/Cart.vue')
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import( '../views/me/Me.vue')
  },
  {
    path: '/details/:id',
    name: 'Details',
    component: () => import( '../views/detail/details.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
