<template>
  <div class="px-8 py-4 border-layout-border border-b bg-white dark:bg-gray-900">
    <h1 class="font-bold text-xl">滑块验证</h1>
    <div class="text-sm mt-2">用于简单的拖动校验</div>
  </div>
  <div class="p-6 flex flex-col gap-6">
    <example-card title="基础示例">
      <div class="flex items-center justify-center w-full gap-6">
        <slider-verify ref="demo1" />
        <el-button type="primary" size="large" @click="demo1?.reset">还原</el-button>
      </div>
    </example-card>
    <example-card title="自定义长度">
      <div class="flex items-center justify-center w-full gap-6">
        <slider-verify ref="demo2" width="400px" />
        <el-button type="primary" size="large" @click="demo2?.reset">还原</el-button>
      </div>
    </example-card>
  </div>
</template>

<script setup lang="ts">
import SliderVerify from '@/components/slider-verify'
import ExampleCard from '@/components/example-card/index.vue'
defineOptions({
  name: 'SliderVerify',
})

const demo1 = useTemplateRef('demo1')
const demo2 = useTemplateRef('demo2')
</script>
