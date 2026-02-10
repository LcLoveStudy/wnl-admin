<template>
  <router-view />
</template>

<script setup lang="ts">
import { useTitle, useTheme } from '@/hooks'
const route = useRoute()
useTheme()
watchEffect(() => {
  useTitle(route.meta.title)
})
</script>

<style scoped></style>
