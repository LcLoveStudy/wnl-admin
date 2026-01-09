<template>
  <div class="flex items-center justify-center cursor-pointer theme-btn" :class="containerClass">
    <el-icon @click="toggleMenuVisible" :size="size" :color="colorComputed">
      <component :is="iconComponent" />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { useCustomStore } from '@/stores'
import { Expand, Fold } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
const { menuStyle, theme } = storeToRefs(useCustomStore())
const { toggleMenuVisible } = useCustomStore()
const iconComponent = computed(() => {
  return menuStyle.value?.visible ? Fold : Expand
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
