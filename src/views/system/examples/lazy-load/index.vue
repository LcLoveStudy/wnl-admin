<template>
  <div class="px-8 py-4 border-layout-border border-b bg-white dark:bg-gray-900">
    <h1 class="font-bold text-xl">懒加载指令</h1>
    <div class="text-sm mt-2">用于实现图片的懒加载功能</div>
  </div>
  <div class="p-6 flex flex-col gap-6">
    <example-card title="基础示例">
      <div class="flex items-center justify-center w-full gap-6">
        <div class="p-4 h-[40vh] w-[50%] overflow-auto rounded border border-layout-border">
          <img
            v-for="(item, index) in imageList"
            :key="index"
            v-lazy="item"
            class="mb-4 rounded mx-auto h-75 w-50"
          />
        </div>
      </div>
    </example-card>
  </div>
</template>

<script setup lang="ts">
import ExampleCard from '@/components/example-card/index.vue'
defineOptions({
  name: 'LazyLoad',
})

const imageList = [
  `https://picsum.photos/id/237/200/300?timestamp=${Date.now()}`,
  `https://picsum.photos/id/238/200/300?timestamp=${Date.now()}`,
  `https://picsum.photos/id/239/200/300?timestamp=${Date.now()}`,
  `https://picsum.photos/id/240/200/300?timestamp=${Date.now()}`,
]
</script>
