<template>
  <div class="w-full h-full grid" :style="BasicLayoutStyle">
    <!-- 侧边栏 -->
    <AppSidebar />
    <!-- 内容区域 -->
    <div class="flex flex-col">
      <!-- 头部 -->
      <AppHeader />
      <!-- 内容 -->
      <AppContent />
    </div>
  </div>
</template>

<script setup lang="ts">
import { LAYOUT_CONSTANTS } from '@/enums/const-enums'
import AppHeader from './components/app-header.vue'
import AppSidebar from './components/app-sidebar.vue'
import AppContent from './components/app-content.vue'
const BasicLayoutStyle = computed(() => ({
  gridTemplateColumns: `${LAYOUT_CONSTANTS.SIDEBAR_WIDTH}px 1fr`,
}))
</script>
