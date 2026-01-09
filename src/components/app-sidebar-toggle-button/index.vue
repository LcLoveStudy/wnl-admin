<template>
  <div
    @click="toggleSidebarVisible"
    class="flex items-center justify-center cursor-pointer"
    :class="containerClass"
  >
    <el-icon :size="size" :color="colorComputed">
      <component :is="iconComponent" />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { useCustomStore } from '@/stores'
import { Expand, Fold } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
const { layoutConfig, theme } = storeToRefs(useCustomStore())
const { toggleSidebarVisible } = useCustomStore()
const iconComponent = computed(() => {
  return layoutConfig.value?.sidebar.visible ? Fold : Expand
})

const colorComputed = computed(() => {
  return theme.value === 'dark' ? '#fff' : '#000'
})

interface Props {
  size?: number | string
  containerClass?: string
}

withDefaults(defineProps<Props>(), {
  size: 20,
})
</script>
