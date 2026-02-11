<template>
  <div class="w-full h-full grid grid-cols-[auto_1fr] transition-all ease-in-out duration-400">
    <!-- 侧边栏 -->
    <AppSidebar />
    <!-- 内容区域 -->
    <div class="flex flex-col transition-all duration-400" :style="ContentBoxStyle">
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
const { layoutConfig } = storeToRefs(useCustomStore())

/** 内容区域 */
const ContentBoxStyle = computed(() => {
  const contentWidth = `calc(100vw - ${layoutConfig.value ? layoutConfig.value.sidebar.width : 0}px)`
  return {
    width: contentWidth,
  }
})
</script>
