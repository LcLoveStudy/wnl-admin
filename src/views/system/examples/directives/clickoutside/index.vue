<template>
  <div class="px-8 py-4 border-layout-border border-b bg-white dark:bg-gray-900">
    <h1 class="font-bold text-xl">点击外部区域指令</h1>
    <div class="text-sm mt-2">用于检测用户是否点击了指定元素外部的区域</div>
  </div>
  <div class="p-6 flex flex-col gap-6">
    <example-card title="基础示例">
      <div class="flex items-center justify-center w-full gap-6">
        <div
          v-clickoutside="clickoutsideHandler"
          class="p-4 bg-amber-200 rounded flex flex-col items-center justify-center text-lg"
        >
          <span>点击我之外的地方可以+1</span>
          <span>{{ demo1 }}</span>
        </div>
      </div>
    </example-card>
  </div>
</template>

<script setup lang="ts">
import ExampleCard from '@/components/example-card/index.vue'
defineOptions({
  name: 'clickoutside',
})

const demo1 = ref(0)
const clickoutsideHandler = () => {
  demo1.value += 1
}
</script>
