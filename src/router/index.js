import { createRouter, createWebHashHistory } from 'vue-router'



const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: 'home'
    },

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
      component: () => import('@/pages/Home/Home.vue'),
      children: [
        {
          path: '/forum',
          name: 'forum',
          component: () => import('@/pages/Home/Section/Forum/Forum.vue')
        },
        {
          path: '/news',
          name: 'news',
          component: () => import('@/pages/Home/Section/News/News.vue')
        },
        {
          path: '/shop',
          name: 'shop',
          component: () => import('@/pages/Home/Section/Shop/Shop.vue')
        },

      ]
    },


  ]
})

export default router
