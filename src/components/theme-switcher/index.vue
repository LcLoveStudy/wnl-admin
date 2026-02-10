<template>
  <div
    @click="onToggleTheme"
    class="flex items-center justify-center cursor-pointer theme-btn"
    :class="containerClass"
  >
    <el-icon :size="size" :color="colorComputed">
      <component :is="iconComponent" />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { useCustomStore } from '@/stores'
import { Moon, Sunny } from '@element-plus/icons-vue'
import { useThemeTransition } from '@/hooks/useThemeTransition'
import { storeToRefs } from 'pinia'
const { theme } = storeToRefs(useCustomStore())
const { toggleTheme } = useCustomStore()
const iconComponent = computed(() => {
  return theme.value === 'dark' ? Sunny : Moon
})

/** 开始切换主题 */
const onToggleTheme = (e: MouseEvent) => {
  if (!e.target) return
  const { start } = useThemeTransition()
  start(e.target as HTMLElement, theme.value === 'dark', toggleTheme)
}

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
