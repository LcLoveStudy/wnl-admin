<template>
  <div class="p-4">
    <!-- 用户信息 -->
    <banner />
    <!-- 数量展示 -->
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 mt-4">
      <StatsCard v-for="item in statistics" :key="item.title" v-bind="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Banner, StatsCard } from './components'
const statistics = [
  {
    title: '总访问量',
    value: 128430,
    trend: '+12.5%',
    icon: 'View',
  },
  {
    title: '新增用户',
    value: 2846,
    trend: '+8.2%',
    icon: 'User',
  },
  {
    title: '订单数量',
    value: 6420,
    trend: '+18.7%',
    icon: 'ShoppingCart',
  },
  {
    title: '总收入',
    value: 82430,
    suffix: '¥',
    trend: '+23.1%',
    icon: 'Money',
  },
]
</script>
