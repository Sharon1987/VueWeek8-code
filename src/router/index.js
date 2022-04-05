import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/ProductsView.vue')
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('../views/ProductView.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue')
  },
  {
    path: '/checkout/:id',
    name: 'checkout',
    component: () => import('../views/CheckOut.vue'),
    meta: {
      title: '確認訂單 | '
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('/')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
