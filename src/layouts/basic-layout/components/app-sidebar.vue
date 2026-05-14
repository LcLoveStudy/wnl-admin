<template>
  <!-- Sidebar 内容 -->
  <aside
    class="h-full tablet:relative phone:absolute border-r border-layout-border transition-all ease-in-out duration-400 overflow-hidden z-50"
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
  <div
    v-if="layoutConfig?.sidebar.visible"
    @click="toggleSidebarVisible()"
    class="tablet:hidden phone:block absolute top-0 left-0 right-0 bottom-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] z-40"
  ></div>
</template>

<script setup lang="ts">
import { LAYOUT_CONSTANTS } from '@/enums/const-enums'
import AppLogo from '@/components/app-logo/index.vue'
import AppSidebarCollapse from './app-sidebar-collapse.vue'
import AppMenu from './app-menu.vue'
import { useCustomStore } from '@/stores'
import { storeToRefs } from 'pinia'
const { layoutConfig } = storeToRefs(useCustomStore())
const { toggleSidebarVisible } = useCustomStore()

/** 侧边栏样式 */
const AppSidebarStyle = computed(() => ({
  width: `${layoutConfig.value?.sidebar.width}px`,
  opacity: layoutConfig.value?.sidebar.visible ? 1 : 0,
  pointerEvents: (layoutConfig.value?.sidebar.visible ? 'auto' : 'none') as 'auto' | 'none',
}))
</script>
