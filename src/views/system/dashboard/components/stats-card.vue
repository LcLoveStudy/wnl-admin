<template>
  <el-card shadow="hover" class="relative transition-all duration-300 hover:-translate-y-1">
    <div class="flex items-center justify-between pl-3">
      <!-- 左侧 -->
      <div class="flex-1">
        <!-- 标题 -->
        <div class="mb-4 flex items-center gap-2">
          <span class="h-2 w-2 rounded-full bg-primary"></span>

          <div
            class="desktop:text-sm tablet:text-base phone:text-base font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400"
          >
            {{ title }}
          </div>
        </div>

        <!-- 数字 -->
        <el-statistic :value="outputValue">
          <template #suffix>
            <span v-if="suffix" class="ml-1 text-sm font-normal text-gray-400 dark:text-gray-500">
              {{ suffix }}
            </span>
          </template>
        </el-statistic>

        <!-- 趋势 -->
        <div
          class="mt-3 flex items-center desktop:text-sm tablet:text-base phone:text-base text-gray-400 dark:text-gray-500"
        >
          <span class="font-medium" :class="trend.startsWith('+') ? 'text-success' : 'text-danger'">
            {{ trend }}
          </span>

          <span class="ml-2">较上月</span>
        </div>
      </div>

      <!-- icon（语义色系统） -->
      <div
        class="ml-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors"
        :class="iconBg"
      >
        <el-icon :size="24">
          <component :is="iconComponent" />
        </el-icon>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useTransition } from '@vueuse/core'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

interface Props {
  title: string
  value: number
  trend: string
  icon: string
  suffix?: string
}

const props = defineProps<Props>()

/**
 * =========================
 * 数字动画
 * =========================
 */
const source = ref(0)

const outputValue = useTransition(source, {
  duration: 1500,
})

watch(
  () => props.value,
  (val) => {
    source.value = val
  },
  { immediate: true },
)

/**
 * =========================
 * icon 动态映射
 * =========================
 */
const iconComponent = computed(() => {
  return ElementPlusIconsVue[props.icon as keyof typeof ElementPlusIconsVue]
})

/**
 * =========================
 * 语义化 icon 背景色系统
 * =========================
 */
const iconBg = computed(() => {
  const map: Record<string, string> = {
    View: 'bg-blue-50 text-blue-500 dark:bg-blue-500/10',
    User: 'bg-green-50 text-green-500 dark:bg-green-500/10',
    ShoppingCart: 'bg-orange-50 text-orange-500 dark:bg-orange-500/10',
    Money: 'bg-purple-50 text-purple-500 dark:bg-purple-500/10',
  }

  return map[props.icon] || 'bg-primary/5 text-primary dark:bg-primary/10'
})
</script>
