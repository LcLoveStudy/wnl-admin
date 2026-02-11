<template>
  <header
    class="h-[50px] border-b border-layout-border flex items-center justify-between pl-2 pr-8"
  >
    <div class="flex items-center">
      <!-- 侧边栏切换按钮 -->
      <app-sidebar-toggle-button
        container-class="w-9 h-9 hover:bg-primary-hover transition-colors rounded"
      />
      <app-breadcrumb container-class="ml-4" />
    </div>
    <div class="flex items-center space-x-4">
      <!-- 主题切换 -->
      <theme-switcher
        container-class="w-9 h-9 hover:bg-primary-hover transition-colors rounded-full"
      />
      <!-- 用户菜单 -->
      <app-user-menu avatar-url="/favicon.ico" />
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeSwitcher from '@/components/theme-switcher/index.vue'
import AppUserMenu from '@/layouts/basic-layout/components/app-user-menu.vue'
import AppSidebarToggleButton from '@/components/app-sidebar-toggle-button/index.vue'
import AppBreadcrumb from './app-breadcrumb.vue'
</script>
