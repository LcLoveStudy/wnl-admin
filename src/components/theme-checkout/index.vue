<template>
  <div class="flex items-center cursor-pointer theme-btn">
    <sun-icon @click="checkoutTheme" v-if="theme === 'dark'" />
    <moon-icon @click="checkoutTheme" v-else />
  </div>
</template>

<script setup lang="ts">
  import SunIcon from '@/components/svg/sun.vue'
  import MoonIcon from '@/components/svg/moon.vue'
  import { useCustomStore } from '@/stores'
  import { storeToRefs } from 'pinia'
  const { theme } = storeToRefs(useCustomStore())
  const { checkoutTheme } = useCustomStore()
</script>
