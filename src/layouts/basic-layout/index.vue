<template>
  <div class="w-full h-full grid transition-all ease-in-out" :style="BasicLayoutStyle">
    <!-- 侧边栏 -->
    <AppSidebar v-if="showAppSidebar" />
    <!-- 内容区域 -->
    <div
      class="flex flex-col transition-all"
      :style="{ transitionDuration: `${LAYOUT_CONSTANTS.LAYOUT_ANIMATION_DURATION}ms` }"
    >
      <!-- 头部 -->
      <AppHeader />
      <!-- 内容 -->
      <AppContent />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/app-header.vue'
import AppSidebar from './components/app-sidebar.vue'
import AppContent from './components/app-content.vue'
import { useCustomStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { LAYOUT_CONSTANTS } from '@/enums/const-enums'
const { layoutConfig } = storeToRefs(useCustomStore())
/** 计算整体布局样式 */
const BasicLayoutStyle = computed(() => {
  const config = layoutConfig.value
  let gridTemplateColumns = '1fr' // 默认只有内容区域
  if (config?.menu.position === 'sidebar') {
    // 菜单在侧边栏时，根据侧边栏宽度决定布局
    const sidebarWidth = config.sidebar?.width
    gridTemplateColumns = sidebarWidth ? `${sidebarWidth}px 1fr` : '0 1fr'
  }
  return {
    gridTemplateColumns,
    transitionDuration: `${LAYOUT_CONSTANTS.LAYOUT_ANIMATION_DURATION}ms`,
  }
})

/** 是否展示侧边栏，如果菜单不在侧边那就无需展示侧边栏 */
const showAppSidebar = computed(() => {
  return layoutConfig.value && layoutConfig.value.menu.position === 'sidebar'
})
</script>
