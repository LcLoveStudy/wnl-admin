import { createRouter, createWebHashHistory } from 'vue-router'
import { setupRouterGuards, setupTabGuards } from './guards'
import { rootRoute, staticRoutes } from '@/router/config/staticRoutes'
import { formatRoutes } from '@/router/utils'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...formatRoutes(staticRoutes), rootRoute],
})

setupRouterGuards(router)
setupTabGuards(router)
export default router
