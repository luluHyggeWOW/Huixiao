import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/Login/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/Register/Register.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/pages/Home/Home.vue')
    },

  ]
})

export default router
