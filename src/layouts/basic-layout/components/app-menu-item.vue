<template>
  <el-sub-menu v-if="isSubMenu && !menuItem.hidden" :index="menuItem.name">
    <template #title>
      <el-icon>
        <component :is="menuItem.icon" />
      </el-icon>
      <span>{{ menuItem.title }}</span>
    </template>

    <app-menu-item v-for="item in menuItem.children" :key="item.name" :menu-item="item" />
  </el-sub-menu>

  <el-menu-item v-else-if="!menuItem.hidden" :index="menuItem.name">
    <el-icon>
      <component :is="menuItem.icon" />
    </el-icon>

    <template #title>
      <span>{{ menuItem.title }}</span>
    </template>
  </el-menu-item>
</template>

<script setup lang="ts">
import type { MenuItemType } from '@/types/menu'

const { menuItem } = defineProps<{
  menuItem: MenuItemType
}>()

const isSubMenu = computed(() => {
  return (
    menuItem.children &&
    menuItem.children.length > 0 &&
    menuItem.children.filter((v) => !v.hidden).length
  )
})
</script>
