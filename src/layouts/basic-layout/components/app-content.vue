<template>
  <main class="flex-1 bg-app-bg">
    <slot>
      <keep-alive :include="chcheKeys">
        <router-view :key="cacheKey" />
      </keep-alive>
    </slot>
  </main>
</template>

<script setup lang="ts">
import { useRoutesStore } from '@/stores'
import { generateCacheKey } from '@/utils/tabs'
import { storeToRefs } from 'pinia'

const route = useRoute()
const { visitedViews } = storeToRefs(useRoutesStore())

/** 当前缓存的key */
const cacheKey = computed(() => {
  return generateCacheKey(String(route.name), route.params, route.query)
})

/** 缓存下来的key */
const chcheKeys = computed(() => visitedViews.value.map((v) => v.cacheKey))
</script>
