<template>
  <div class="w-full h-full grid transition-all duration-300 ease-in-out" :style="BasicLayoutStyle">
    <!-- 侧边栏 -->
    <AppSidebar />
    <!-- 内容区域 -->
    <div class="flex flex-col transition-all duration-300">
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
const { menuStyle } = storeToRefs(useCustomStore())
/** 计算整体布局样式 */
const BasicLayoutStyle = computed(() => ({
  gridTemplateColumns:
    menuStyle.value && menuStyle.value.width ? `${menuStyle.value.width}px 1fr` : '1fr',
}))
</script>
