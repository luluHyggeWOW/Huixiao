import { createRouter, createWebHashHistory } from 'vue-router'



const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: 'news'
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
          component: () => import('@/pages/Home/Section/Forum/Forum.vue'),
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
        {
          path: '/userinfo',
          name: 'userinfo',
          component: () => import('@/pages/Home/Head/Userinfo/Userinfo.vue'),
        },
      ]
    },


  ]
})

export default router
