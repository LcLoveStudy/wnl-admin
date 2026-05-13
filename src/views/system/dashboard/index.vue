<template>
  <div class="p-4">
    <!-- 用户信息 -->
    <banner />
    <!-- 数量展示 -->
    <div class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 mt-4">
      <StatsCard v-for="item in statistics" :key="item.title" v-bind="item" />
    </div>
    <!-- 3️⃣ 图表区域 -->
    <div class="grid grid-cols-1 gap-5 tablet:grid-cols-12 mt-4">
      <!-- 趋势图（主图） -->
      <div class="desktop:col-span-8 tablet:col-span-7">
        <trend-chart />
      </div>

      <!-- 饼图 -->
      <div class="desktop:col-span-4 tablet:col-span-5">
        <pie-chart />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Banner, StatsCard, TrendChart, PieChart } from './components'
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
