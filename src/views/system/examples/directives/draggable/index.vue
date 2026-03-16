<template>
  <div class="px-8 py-4 border-layout-border border-b bg-white dark:bg-gray-900">
    <h1 class="font-bold text-xl">拖拽指令</h1>
    <div class="text-sm mt-2">用于实现元素的拖拽功能</div>
  </div>
  <div class="p-6 flex flex-col gap-6">
    <example-card title="基础示例">
      <div class="flex items-center justify-center w-full gap-6 h-12">
        <div
          v-draggable
          class="p-4 bg-amber-200 z-999 rounded flex flex-col items-center justify-center text-lg cursor-grabbing select-none"
        >
          <span>拖拽我</span>
        </div>
      </div>
    </example-card>
    <example-card title="设置拖拽边界" class="example-card">
      <div class="flex items-center justify-center w-full gap-6 h-12">
        <div
          v-draggable="{
            boundary: '.example-card',
          }"
          class="p-4 bg-blue-200 z-999 rounded flex flex-col items-center justify-center text-lg cursor-grabbing select-none"
        >
          <span>我只能在示例卡片内拖拽，默认值为window</span>
        </div>
      </div>
    </example-card>
    <example-card title="网格示例" class="example-card">
      <div class="flex items-center justify-center w-full gap-6 h-12">
        <div
          v-draggable="{
            snap: 10,
          }"
          class="p-4 bg-fuchsia-100 z-999 rounded flex flex-col items-center justify-center text-lg cursor-grabbing select-none"
        >
          <span>我每次拖拽都会吸附到网格</span>
        </div>
      </div>
    </example-card>
    <example-card title="限制拖拽触发区域" class="example-card">
      <div class="flex items-center justify-center w-full gap-6 h-26">
        <div
          v-draggable="{
            handle: '.drag-header',
          }"
          class="p-4 bg-amber-200 z-999 rounded flex flex-col items-center justify-center text-lg select-none"
        >
          <div class="drag-header p-2 bg-amber-300 rounded cursor-grab">拖拽头部</div>
          <span>只有拖拽头部才能触发拖拽</span>
        </div>
      </div>
    </example-card>
    <example-card title="限制拖拽方向" class="example-card">
      <div class="flex items-center justify-center w-full gap-6 h-26">
        <div
          v-draggable="{
            axis: 'x',
          }"
          class="p-4 bg-purple-300 z-999 rounded flex flex-col items-center justify-center text-lg select-none cursor-grabbing"
        >
          <span>只能在X轴方向拖拽</span>
        </div>
      </div>
    </example-card>
    <example-card title="触发回调" class="example-card">
      <div class="flex items-center justify-center w-full gap-6 h-26">
        <div
          v-draggable="{
            onDrag: dragHandler,
          }"
          class="p-4 bg-purple-300 z-999 rounded flex flex-col items-center justify-center text-lg select-none cursor-grabbing"
        >
          <span>触发回调打印</span>
        </div>
      </div>
    </example-card>
  </div>
</template>

<script setup lang="ts">
import ExampleCard from '@/components/example-card/index.vue'
defineOptions({
  name: 'draggable',
})
const dragHandler = (e: { x: number; y: number }) => {
  console.log(e.x, e.y)
}
</script>

<style scoped lang="less"></style>
