<template>
  <!-- Sidebar 内容 -->
  <aside class="h-full border-r border-layout-border" :style="AppSidebarStyle">
    <!-- logo部分 -->
    <app-logo :container-class="`pl-8 h-[${LAYOUT_CONSTANTS.HEADER_HEIGHT}px]`" />
  </aside>
</template>

<script setup lang="ts">
import { LAYOUT_CONSTANTS } from '@/enums/const-enums'
import AppLogo from '@/components/app-logo/index.vue'

/** 侧边栏宽度 */
const AppSidebarStyle = computed(() => ({
  width: `${LAYOUT_CONSTANTS.SIDEBAR_WIDTH}px`,
}))
</script>
