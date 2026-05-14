<template>
  <el-breadcrumb separator=">" :class="containerClass">
    <el-breadcrumb-item v-for="item in breadcrumb" :key="item.path" @click="breadcrumbToggle(item)">
      <div
        class="flex items-center gap-2 desktop:text-base tablet:text-2xl phone:text-2xl"
        :class="dynamicClasses(item)"
      >
        <el-icon v-if="item.meta.icon">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </div>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoutesStore } from '@/stores'
import type { RouteLocationMatched } from 'vue-router'
const router = useRouter()
const route = useRoute()

defineProps({
  containerClass: {
    type: String,
    default: '',
  },
})

/** 点击单个面包屑 */
const breadcrumbToggle = (item: RouteLocationMatched) => {
  if (!item.children || !item.children.length) return
  const firstChild = item.children[0]
  if (
    !firstChild ||
    (firstChild.children && firstChild.children.length) ||
    firstChild.name === route.name
  )
    return
  const { visitedViews } = useRoutesStore()
  const target = visitedViews.find((v) => v.name === firstChild.name)
  if (!target) {
    router.push({ name: String(firstChild.name) })
  } else {
    router.push({ name: String(target.name), params: target.params, query: target.query })
  }
}

/** 单个路由类名计算 */
const dynamicClasses = (item: RouteLocationMatched) => {
  return {
    'text-primary': item.path === route.path,
    'hover:text-primary cursor-pointer': item.path !== route.path,
  }
}

const breadcrumb = computed(() => {
  const matched = route.matched.filter((r) => r.meta.breadcrumb)
  return matched.filter((v) => v.path !== '/').map((r) => r)
})
</script>
