<template>
  <div class="w-full h-full grid transition-all ease-in-out" :style="BasicLayoutStyle">
    <!-- 侧边栏 -->
    <AppSidebar />
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
import { LAYOUT_CONSTANTS } from '@/enums/const-enums'
/** 计算整体布局样式 */
const BasicLayoutStyle = computed(() => {
  const gridTemplateColumns = '1fr' // 默认只有内容区域
  return {
    gridTemplateColumns,
    transitionDuration: `${LAYOUT_CONSTANTS.LAYOUT_ANIMATION_DURATION}ms`,
  }
})
</script>
