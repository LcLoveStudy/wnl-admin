<template>
  <div class="border-b border-layout-border px-3 pt-1">
    <el-tabs v-model="editableTabsValue" type="card" closable @edit="handleTabsEdit">
      <el-tab-pane v-for="item in 99" :key="item" :label="item" :name="item"> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import type { TabPaneName } from 'element-plus'

const editableTabsValue = ref('2')
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content',
  },
])

const handleTabsEdit = (targetName: TabPaneName | undefined, action: 'remove' | 'add') => {
  if (action === 'remove') {
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }

    editableTabsValue.value = activeName
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  }
}
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
