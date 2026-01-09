<template>
  <!-- Sidebar 内容 -->
  <aside
    class="h-full relative border-r border-layout-border transition-all ease-in-out overflow-hidden"
    :style="AppSidebarStyle"
  >
    <!-- logo部分 -->
    <app-logo
      :showTitle="!layoutConfig?.sidebar.collapsed"
      :container-class="`pl-4 h-[${LAYOUT_CONSTANTS.HEADER_HEIGHT}px]`"
    />
    <!-- 菜单 -->
    <app-menu />
    <!-- 折叠侧边栏 -->
    <app-sidebar-collapse
      container-class="absolute bottom-4 left-6 w-7 h-7 rounded bg-primary-hover hover:bg-[#ccc] dark:hover:bg-[#666] transition-all ease-in-out"
    />
  </aside>
</template>

<script setup lang="ts">
import { LAYOUT_CONSTANTS } from '@/enums/const-enums'
import AppLogo from '@/components/app-logo/index.vue'
import AppSidebarCollapse from './app-sidebar-collapse.vue'
import AppMenu from './app-menu.vue'
import { useCustomStore } from '@/stores'
import { storeToRefs } from 'pinia'
const { layoutConfig } = storeToRefs(useCustomStore())
/** 侧边栏样式 */
const AppSidebarStyle = computed(() => ({
  width: `${layoutConfig.value?.sidebar.width}px`,
  opacity: layoutConfig.value?.sidebar.visible ? 1 : 0,
  pointerEvents: (layoutConfig.value?.sidebar.visible ? 'auto' : 'none') as 'auto' | 'none',
  transitionDuration: `${LAYOUT_CONSTANTS.LAYOUT_ANIMATION_DURATION}ms`,
}))
</script>
