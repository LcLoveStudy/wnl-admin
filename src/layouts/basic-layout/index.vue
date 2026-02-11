<template>
  <div class="w-full h-full grid transition-all ease-in-out" :style="BasicLayoutStyle">
    <!-- 侧边栏 -->
    <AppSidebar />
    <!-- 内容区域 -->
    <div class="flex flex-col transition-all" :style="ContentBoxStyle">
      <!-- 头部 -->
      <AppHeader />
      <!-- 标签 -->
      <AppTabsView />
      <!-- 内容 -->
      <AppContent />
    </div>
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/app-header.vue'
import AppSidebar from './components/app-sidebar.vue'
import AppContent from './components/app-content.vue'
import AppTabsView from './components/app-tabs-view.vue'
import { useCustomStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { LAYOUT_CONSTANTS } from '@/enums/const-enums'
const { layoutConfig } = storeToRefs(useCustomStore())
/** 计算整体布局样式 */
const BasicLayoutStyle = computed(() => {
  const config = layoutConfig.value
  let gridTemplateColumns = '0 1fr' // 默认只有内容区域
  if (config?.sidebar.visible) {
    // 菜单在侧边栏时，根据侧边栏宽度决定布局
    const sidebarWidth = config.sidebar?.width
    gridTemplateColumns = sidebarWidth ? `${sidebarWidth}px 1fr` : '0 1fr'
  }
  return {
    gridTemplateColumns,
    transitionDuration: `${LAYOUT_CONSTANTS.LAYOUT_ANIMATION_DURATION}ms`,
  }
})

/** 内容区域 */
const ContentBoxStyle = computed(() => {
  const contentWidth = `calc(100vw - ${layoutConfig.value ? layoutConfig.value.sidebar.width : 0}px)`
  return {
    transitionDuration: `${LAYOUT_CONSTANTS.LAYOUT_ANIMATION_DURATION}ms`,
    width: contentWidth,
  }
})
</script>
