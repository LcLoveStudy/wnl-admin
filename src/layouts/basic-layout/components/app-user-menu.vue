<template>
  <div class="relative" @mouseleave="handleMouseLeave">
    <div @mouseenter="handleMouseEnter">
      <app-avatar :size="30" avatar-url="/favicon.ico" />
    </div>
    <!-- 菜单项 -->
    <transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-[10px]"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-[10px]"
    >
      <div
        v-show="isMenuVisible"
        class="absolute top-full right-[-10px] mt-2 min-w-[200px] border border-solid border-gray-300 bg-white rounded-md shadow-lg z-50 py-1"
        @mouseenter="handleMenuEnter"
        @mouseleave="handleMenuLeave"
      >
        <!-- 用户信息 -->
        <div v-if="showUserInfo" class="px-4 py-3 mb-1 border-b border-gray-300">
          <div class="flex items-center gap-4">
            <app-avatar :size="40" avatar-url="/favicon.ico" />
            <div class="flex flex-col items-start">
              <span class="text-xl font-medium text-gray-900">
                {{ userStore.userinfo?.nickname || userStore.userinfo?.username }}
              </span>
              <span v-if="userStore.userinfo?.username" class="text-xl text-gray-400 mt-0.5">
                {{ userStore.userinfo.username }}
              </span>
            </div>
          </div>
        </div>
        <!-- 菜单列表 -->
        <div v-for="item in defaultMenuItems" :key="item.command" class="px-1">
          <div
            class="px-4 py-2 flex items-center rounded-xs gap-2 text-xl text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
            @click="handleMenuItemClick(item)"
          >
            <el-icon v-if="item.icon" class="text-xl">
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.label }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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

interface Props {
  /** 是否显示用户信息 */
  showUserInfo?: boolean
}

withDefaults(defineProps<Props>(), {
  showUserInfo: true,
})

const userStore = useUserStore()
const isMenuVisible = ref(false)
let hideTimer: ReturnType<typeof setTimeout> | null = null

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

// 鼠标进入头像区域
const handleMouseEnter = () => {
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
  isMenuVisible.value = true
}

// 鼠标离开头像区域
const handleMouseLeave = () => {
  // 延迟隐藏，给鼠标移动到菜单的时间
  hideTimer = setTimeout(() => {
    isMenuVisible.value = false
  }, 100)
}

// 鼠标进入菜单区域
const handleMenuEnter = () => {
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = null
  }
  isMenuVisible.value = true
}

// 鼠标离开菜单区域
const handleMenuLeave = () => {
  isMenuVisible.value = false
}

// 处理菜单项点击
const handleMenuItemClick = (item: MenuItem) => {
  if (item.handler) {
    item.handler()
  }
  // 点击后隐藏菜单
  isMenuVisible.value = false
}
</script>

<style lang="less" scoped></style>
