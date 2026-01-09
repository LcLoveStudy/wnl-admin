<template>
  <!-- Sidebar 内容 -->
  <aside
    class="h-full border-r border-layout-border transition-all ease-in-out overflow-hidden"
    :style="AppSidebarStyle"
  >
    <!-- logo部分 -->
    <app-logo :container-class="`pl-8 h-[${LAYOUT_CONSTANTS.HEADER_HEIGHT}px]`" />
  </aside>
</template>

<script setup lang="ts">
import { LAYOUT_CONSTANTS } from '@/enums/const-enums'
import AppLogo from '@/components/app-logo/index.vue'
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
