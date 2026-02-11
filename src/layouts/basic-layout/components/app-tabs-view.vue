<template>
  <div class="border-b border-layout-border px-3 pt-1">
    <el-tabs
      v-model="activedTabName"
      type="card"
      :closable="visitedViews.length > 1"
      @edit="handleTabsEdit"
      @tab-click="selectTabHandler"
    >
      <el-tab-pane
        v-for="item in visitedViews"
        :key="item.cacheKey"
        :label="item.title"
        :name="item.cacheKey"
      >
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import type { TabPaneName, TabsPaneContext } from 'element-plus'
import { useRoutesStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { generateCacheKey, parseCacheKey } from '@/utils/tabs'
const { visitedViews } = storeToRefs(useRoutesStore())
const route = useRoute()
const router = useRouter()
const activedTabName = ref('')

/** 处理tab切换 */
const selectTabHandler = (tab: TabsPaneContext) => {
  if (!tab.paneName || tab.paneName === activedTabName.value) return
  const target = visitedViews.value.find((v) => v.cacheKey === tab.paneName)
  if (!target) return
  const { params, query } = parseCacheKey(String(tab.paneName)) || {}
  router.push({ name: target.name, params, query })
}

/** 处理tab编辑 */
const handleTabsEdit = (targetName: TabPaneName | undefined, action: 'remove' | 'add') => {
  if (action === 'remove') {
    const tabs = visitedViews.value
    let activeName = activedTabName.value
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.cacheKey === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.cacheKey
          }
        }
      })
    }
    activedTabName.value = activeName
    visitedViews.value = tabs.filter((tab) => tab.cacheKey !== targetName)
    const { params, query } = parseCacheKey(String(activeName)) || {}
    router.push({
      name: visitedViews.value.find((v) => v.cacheKey === activeName)?.name,
      params,
      query,
    })
  }
}

watchEffect(() => {
  /** 自动监听路由设置当前tab */
  activedTabName.value = generateCacheKey(String(route.name), route.params, route.query)
})
</script>

<style lang="less" scoped>
:deep(.el-tabs__header) {
  margin-bottom: 0;
  border-bottom: none;
  .el-tabs__item.is-active {
    border-bottom: none;
  }
}
</style>
