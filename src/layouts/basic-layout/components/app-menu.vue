<template>
  <div class="py-2" :class="{ 'px-2': !layoutConfig?.sidebar.collapsed }">
    <el-menu
      :default-active="activeName"
      :collapse="layoutConfig?.sidebar.collapsed"
      @select="selectMenuHandler"
    >
      <app-menu-item v-for="menuItem in menuList" :key="menuItem.name" :menuItem="menuItem" />
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import AppMenuItem from './app-menu-item.vue'
import { storeToRefs } from 'pinia'
import type { RouteConfig } from '@/router/types'
import { useCustomStore, useRoutesStore } from '@/stores'
import type { MenuItemType } from '@/types/menu'
const { layoutConfig } = storeToRefs(useCustomStore())
const { dynamicRoutes } = storeToRefs(useRoutesStore())
const router = useRouter()

const activeName = computed(() => {
  return router.currentRoute.value.name as string
})

const menuList = computed(() => {
  return formatMenu(dynamicRoutes.value)
})

/** 格式化路由为菜单 */
const formatMenu = (routes: RouteConfig[]): MenuItemType[] => {
  return routes.map((route) => {
    const item = {
      title: route.meta.title,
      name: route.name,
      icon: route.meta.icon,
      children: [] as MenuItemType[],
    }
    if (route.children) {
      item.children = formatMenu(route.children)
    }
    return item
  })
}

/** 激活菜单，触发跳转 */
const selectMenuHandler = (name: string) => {
  router.push({ name })
}
</script>

<style lang="less" scoped>
@menu-item-height: 42px;
:deep(.el-menu) {
  border-right: none;
  .el-menu-item,
  .el-sub-menu__title {
    height: @menu-item-height;
    line-height: @menu-item-height;
    border-radius: 10px;
  }
}
:deep(.el-menu--collapse) {
  width: 50px;
  margin: 0 auto;
  .el-sub-menu__title,
  .el-menu-item .el-menu-tooltip__trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
}
</style>
