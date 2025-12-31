import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      meta: {
        title: '登录',
      },
      component: () => import('@/views/login/index.vue'),
    },
  ],
})

export default router
