<template>
  <div
    class="tablet:w-8 tablet:h-3 phone:w-16 phone:h-8 flex items-center justify-center cursor-pointer theme-btn"
  >
    <component :is="iconComponent" @click="checkoutTheme" />
  </div>
</template>

<script setup lang="ts">
import SunIcon from '@/components/svg/sun.vue'
import MoonIcon from '@/components/svg/moon.vue'
import { useCustomStore } from '@/stores'
import { storeToRefs } from 'pinia'
const { theme } = storeToRefs(useCustomStore())
const { checkoutTheme } = useCustomStore()
const iconComponent = computed(() => {
  return theme.value === 'dark' ? SunIcon : MoonIcon
})
</script>
