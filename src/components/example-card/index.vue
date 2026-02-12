<template>
  <div class="bg-white dark:bg-gray-900 border border-layout-border rounded-lg">
    <div class="p-4 border-b border-layout-border text-xl font-medium">{{ title }}</div>
    <div class="p-4">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>
