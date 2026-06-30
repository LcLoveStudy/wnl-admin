<template>
  <div class="border-b border-layout-border px-3 pt-1">
    <el-tabs
      v-model="activedTabName"
      type="card"
      :closable="visitedViews.length > 1"
      @edit="handleTabsEdit"
      @tab-click="selectTabHandler"
    >
      <el-tab-pane v-for="item in visitedViews" :key="item.cacheKey" :name="item.cacheKey">
        <template #label>
          <span @contextmenu.prevent="openContextMenu($event, item)">
            {{ item.title }}
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>

    <!-- 右键菜单 -->
    <ul
      v-show="contextMenuVisible"
      :style="{ left: `${contextMenuLeft}px`, top: `${contextMenuTop}px` }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTab">重新加载</li>
      <li @click="closeSelectedTab">关闭当前</li>
      <li @click="closeOthersTabs">关闭其他</li>
      <li @click="closeLeftTabs">关闭左侧</li>
      <li @click="closeRightTabs">关闭右侧</li>
      <li @click="closeAllTabs">全部关闭</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { TabPaneName, TabsPaneContext } from 'element-plus'
import { useRoutesStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { generateCacheKey, parseCacheKey } from '@/utils/tabs'
import type { TabViewType } from '@/types/tabs'

const routesStore = useRoutesStore()
const { visitedViews } = storeToRefs(routesStore)
const route = useRoute()
const router = useRouter()
const activedTabName = ref('')

// 右键菜单相关状态
const contextMenuVisible = ref(false)
const contextMenuLeft = ref(0)
const contextMenuTop = ref(0)
const selectedTab = ref<TabViewType | null>(null)

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
    closeTabByName(targetName as string)
  }
}

/** 通用关闭单个 tab 逻辑 */
const closeTabByName = (targetName: string) => {
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

// ================= 右键菜单相关逻辑 =================

const openContextMenu = (e: MouseEvent, tab: TabViewType) => {
  contextMenuLeft.value = e.clientX
  contextMenuTop.value = e.clientY + 10 // 偏移一点防止鼠标马上点击到
  contextMenuVisible.value = true
  selectedTab.value = tab
}

const closeContextMenu = () => {
  contextMenuVisible.value = false
  selectedTab.value = null
}

watch(contextMenuVisible, (value) => {
  if (value) {
    document.body.addEventListener('click', closeContextMenu)
  } else {
    document.body.removeEventListener('click', closeContextMenu)
  }
})

// 重新加载
const refreshSelectedTab = () => {
  if (!selectedTab.value) return
  // 先通知 Store 删除当前标签的 keep-alive 缓存标记
  routesStore.delCachedView(selectedTab.value)

  const { name, cacheKey } = selectedTab.value
  const { params, query } = parseCacheKey(cacheKey) || {}

  // 等待 Vue 下一渲染周期，确保 keep-alive 实例已被销毁
  nextTick(() => {
    router.replace({ path: '/redirect' + route.fullPath }).catch(() => {
      // 如果没有 Redirect 页面，临时方案：跳转同一个带个时间戳的 query 或者直接重载
      router.replace({ name, params, query: { ...query, _t: Date.now() } })
    })
  })
}

// 关闭当前
const closeSelectedTab = () => {
  if (!selectedTab.value) return
  closeTabByName(selectedTab.value.cacheKey)
}

// 关闭其他
const closeOthersTabs = () => {
  if (!selectedTab.value) return
  const targetKey = selectedTab.value.cacheKey
  visitedViews.value = visitedViews.value.filter((tab) => tab.cacheKey === targetKey)

  if (activedTabName.value !== targetKey) {
    activedTabName.value = targetKey
    const { params, query } = parseCacheKey(targetKey) || {}
    router.push({ name: selectedTab.value.name, params, query })
  }
}

// 关闭左侧
const closeLeftTabs = () => {
  if (!selectedTab.value) return
  const index = visitedViews.value.findIndex((tab) => tab.cacheKey === selectedTab.value?.cacheKey)
  if (index > 0) {
    const closedKeys = visitedViews.value.slice(0, index).map((t) => t.cacheKey)
    visitedViews.value = visitedViews.value.slice(index)
    if (closedKeys.includes(activedTabName.value)) {
      const targetKey = selectedTab.value.cacheKey
      activedTabName.value = targetKey
      const { params, query } = parseCacheKey(targetKey) || {}
      router.push({ name: selectedTab.value.name, params, query })
    }
  }
}

// 关闭右侧
const closeRightTabs = () => {
  if (!selectedTab.value) return
  const index = visitedViews.value.findIndex((tab) => tab.cacheKey === selectedTab.value?.cacheKey)
  if (index !== -1 && index < visitedViews.value.length - 1) {
    const closedKeys = visitedViews.value.slice(index + 1).map((t) => t.cacheKey)
    visitedViews.value = visitedViews.value.slice(0, index + 1)
    if (closedKeys.includes(activedTabName.value)) {
      const targetKey = selectedTab.value.cacheKey
      activedTabName.value = targetKey
      const { params, query } = parseCacheKey(targetKey) || {}
      router.push({ name: selectedTab.value.name, params, query })
    }
  }
}

// 全部关闭
const closeAllTabs = () => {
  // 保留 Dashboard 首页或者至少保留一个
  const firstTab = visitedViews.value[0]
  if (!firstTab) return
  visitedViews.value = [firstTab]
  if (activedTabName.value !== firstTab.cacheKey) {
    activedTabName.value = firstTab.cacheKey
    const { params, query } = parseCacheKey(firstTab.cacheKey) || {}
    router.push({ name: firstTab.name, params, query })
  }
}

// ================= /右键菜单相关逻辑 =================

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

.contextmenu {
  margin: 0;
  background: var(--el-bg-color-overlay);
  z-index: 3000;
  position: fixed;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  color: var(--el-text-color-regular);
  box-shadow: var(--el-box-shadow-light);
  border: 1px solid var(--el-border-color-light);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: var(--el-color-primary-light-9);
      color: var(--el-color-primary);
    }
  }
}
</style>
