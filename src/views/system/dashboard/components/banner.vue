<template>
  <el-card shadow="never">
    <div class="flex items-center justify-between">
      <!-- 左侧 -->
      <div>
        <div class="mb-5 flex items-center gap-2">
          <div class="text-2xl font-bold text-primary">👋 欢迎回来，{{ userinfo?.nickname }}</div>

          <div class="rounded-full bg-green-100 px-2 py-1 text-xs text-green-600">Online</div>
        </div>

        <div class="flex items-center gap-6 text-sm text-gray-400">
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
        <div class="rounded-2xl border border-layout-border bg-primary-hover px-6 py-4">
          <div class="text-2xl font-bold text-primary">工作台</div>

          <div class="mt-3 text-xs text-gray-400">Version 1.0.0</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const { userinfo } = storeToRefs(useUserStore())

const currentTime = computed(() => {
  return new Date().toLocaleString()
})
</script>
