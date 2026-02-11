<template>
  <main class="flex-1 bg-app-bg">
    <slot>
      <router-view v-slot="{ Component }">
        <keep-alive :include="cacheKeys">
          <component :is="Component" :key="cacheKey" />
        </keep-alive>
      </router-view>
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
const cacheKey = computed(() => generateCacheKey(String(route.name), route.params, route.query))

/** 缓存下来的key */
const cacheKeys = computed(() => visitedViews.value.filter((v) => v.keepAlive).map((v) => v.name))
</script>
