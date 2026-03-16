<template>
  <div
    class="w-full h-full tablet:grid grid-cols-[auto_1fr] phone:block transition-all ease-in-out duration-400"
  >
    <!-- 侧边栏 -->
    <AppSidebar />
    <!-- 内容区域 -->
    <div class="h-screen flex flex-col transition-all duration-400">
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
</script>
