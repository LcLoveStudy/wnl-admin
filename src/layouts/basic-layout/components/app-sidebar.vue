<template>
  <!-- Sidebar 内容 -->
  <aside
    v-show="menuStyle?.visible"
    class="h-full border-r border-layout-border"
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
/** 侧边栏宽度 */
const AppSidebarStyle = computed(() => ({
  width: `${menuStyle.value?.width}px`,
}))
</script>
