<template>
  <el-dropdown @command="handleCommand">
    <app-avatar :size="30" avatar-url="/favicon.ico" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in defaultMenuItems"
          :key="item.command"
          :command="item.command"
          :divided="item.divided"
        >
          <el-icon v-if="item.icon"><component :is="item.icon" /></el-icon>
          <span>{{ item.label }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { Star, SwitchButton } from '@element-plus/icons-vue'
import AppAvatar from '@/components/app-avatar/index.vue'
import { useUserStore } from '@/stores'

interface MenuItem {
  command: string
  label: string
  icon?: any
  divided?: boolean
  handler?: () => void
}

const userStore = useUserStore()

// 默认菜单项
const defaultMenuItems: MenuItem[] = [
  {
    command: 'github',
    label: 'GitHub',
    icon: Star,
    handler: () => {
      window.open('https://github.com/LcLoveStudy/wnl-admin', '_blank')
    },
  },
  {
    command: 'logout',
    label: '退出登录',
    icon: SwitchButton,
    divided: true,
    handler: async () => {
      await userStore.logout()
    },
  },
]

// 处理菜单命令
const handleCommand = (command: string) => {
  // 查找对应的菜单项并执行 handler
  const menuItem = defaultMenuItems.find((item) => item.command === command)
  if (menuItem?.handler) {
    menuItem.handler()
  }
}
</script>

<style lang="less" scoped>
:deep(.el-tooltip__trigger) {
  &:focus-visible {
    outline: none !important;
  }
}

:deep(.el-dropdown-menu__item) {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
