<template>
  <div class="h-full flex items-center justify-center bg-app-bg px-4">
    <div class="max-w-md w-full text-center">
      <!-- 错误代码 -->
      <div :class="['text-6xl md:text-7xl lg:text-8xl font-bold mb-6', codeColor]">
        {{ errorCode }}
      </div>

      <!-- 错误标题 -->
      <h1 class="text-2xl md:text-3xl font-semibold mb-4">
        {{ title }}
      </h1>

      <!-- 错误描述 -->
      <p class="text-gray-600 dark:text-white mb-8 text-base md:text-lg">
        {{ description }}
      </p>

      <!-- 操作按钮 -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <el-button
          class=""
          v-for="action in actions"
          :key="action.key"
          :type="action.primary ? 'primary' : 'default'"
          @click="action.handler"
        >
          {{ action.label }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Action {
  key: string
  label: string
  primary?: boolean
  handler: () => void
}

interface Props {
  errorCode: string | number
  title: string
  description: string
  codeColor?: string
  actions?: Action[]
}

const props = withDefaults(defineProps<Props>(), {
  codeColor: 'text-blue-500',
  actions: () => [],
})
</script>

<style lang="less" scoped>
:deep(.el-button + .el-button) {
  margin-left: 0;
}
</style>
