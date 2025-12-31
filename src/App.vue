<template>
  <router-view />
</template>

<script setup lang="ts">
import { useTitle } from '@/hooks'
const route = useRoute()
watchEffect(() => {
  useTitle(route.meta.title)
})
</script>

<style scoped></style>
