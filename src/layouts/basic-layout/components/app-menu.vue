<template>
  <div class="py-2" :class="{ 'px-2': !layoutConfig?.sidebar.collapsed }">
    <el-menu default-active="2" :collapse="layoutConfig?.sidebar.collapsed">
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import { useCustomStore } from '@/stores'
const { layoutConfig } = storeToRefs(useCustomStore())
</script>

<style lang="less" scoped>
@menu-item-height: 42px;
:deep(.el-menu) {
  border-right: none;
  .el-menu-item,
  .el-sub-menu__title {
    height: @menu-item-height;
    line-height: @menu-item-height;
    border-radius: 10px;
  }
}
:deep(.el-menu--collapse) {
  width: 50px;
  margin: 0 auto;
  .el-sub-menu__title,
  .el-menu-item .el-menu-tooltip__trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
}
</style>
