<template>
  <div class="flex items-center justify-center cursor-pointer" :class="containerClass">
    <el-icon @click="toggleSidebarCollapsed" :size="size" :color="colorComputed">
      <component :is="iconComponent" />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { useCustomStore } from '@/stores'
import { DArrowRight, DArrowLeft } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'

const { layoutConfig, theme } = storeToRefs(useCustomStore())
const { toggleSidebarCollapsed } = useCustomStore()

// 根据侧边栏折叠状态显示不同图标
const iconComponent = computed(() => {
  return layoutConfig.value?.sidebar.collapsed ? DArrowRight : DArrowLeft
})

// 图标颜色根据主题变化
const colorComputed = computed(() => {
  return theme.value === 'dark' ? '#fff' : '#333'
})

interface Props {
  size?: number | string
  containerClass?: string
}

withDefaults(defineProps<Props>(), {
  size: 14,
})
</script>
