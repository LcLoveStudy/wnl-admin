<template>
  <el-card shadow="never">
    <div class="flex items-center justify-between">
      <!-- 左侧 -->
      <div>
        <!-- 欢迎 + 状态 -->
        <div class="mb-5 flex items-center gap-3">
          <div class="text-2xl font-bold text-primary">👋 欢迎回来，{{ userinfo?.nickname }}</div>

          <div
            class="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 desktop:text-sm tablet:text-base phone:text-base text-green-600 dark:bg-green-500/10 dark:text-green-400"
          >
            <span class="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
            Online
          </div>
        </div>

        <!-- 状态信息 -->
        <div
          class="flex items-center gap-6 desktop:text-sm tablet:text-xl phone:text-xl text-gray-400 dark:text-gray-500"
        >
          <div class="flex items-center gap-2">
            <span class="h-2 w-2 rounded-full bg-green-500"></span>
            系统运行正常
          </div>

          <div>
            {{ currentTime }}
          </div>
        </div>
      </div>

      <!-- 右侧 -->
      <div class="hidden tablet:block">
        <div
          class="rounded-2xl border border-layout-border bg-primary/5 px-6 py-4 text-primary dark:bg-primary/10"
        >
          <div class="text-2xl font-bold">工作台</div>

          <div class="mt-3 text-xs text-gray-400 dark:text-gray-500">Version 1.0.0</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'

const { userinfo } = storeToRefs(useUserStore())

/**
 * =========================
 * 实时时间
 * =========================
 */
const currentTime = ref('')
let timer: number | null = null

const updateTime = () => {
  const now = new Date()

  currentTime.value = now.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

onMounted(() => {
  updateTime()
  timer = window.setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>
