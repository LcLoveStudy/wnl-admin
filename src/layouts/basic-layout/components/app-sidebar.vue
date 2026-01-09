<template>
  <!-- Sidebar 内容 -->
  <aside
    class="h-full border-r border-layout-border transition-all duration-300 ease-in-out overflow-hidden"
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
const { menuStyle } = storeToRefs(useCustomStore())
/** 侧边栏样式 */
const AppSidebarStyle = computed(() => ({
  width: `${menuStyle.value?.width}px`,
  opacity: menuStyle.value?.visible ? 1 : 0,
  pointerEvents: (menuStyle.value?.visible ? 'auto' : 'none') as 'auto' | 'none',
}))
</script>
