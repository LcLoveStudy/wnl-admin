<template>
  <!-- Sidebar 内容 -->
  <aside class="h-full border-r border-layout-border" :style="AppSidebarStyle">
    <!-- logo部分 -->
    <app-logo container-class="pl-8 py-4" />
  </aside>
</template>

<script setup lang="ts">
import { LAYOUT_CONSTANTS } from '@/enums/const-enums'
import AppLogo from '@/components/app-logo/index.vue'

const AppSidebarStyle = computed(() => ({
  width: `${LAYOUT_CONSTANTS.SIDEBAR_WIDTH}px`,
}))
</script>
