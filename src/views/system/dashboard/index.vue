<template>
  <div class="p-4 w-full">
    <!-- 用户信息 -->
    <banner />
    <!-- 数量展示 -->
    <div class="grid grid-cols-1 gap-5 tablet:grid-cols-2 desktop:grid-cols-4 mt-4">
      <StatsCard v-for="item in statistics" :key="item.title" v-bind="item" />
    </div>

    <!-- 趋势图（主图）  -->
    <div class="mt-4 grid grid-cols-1 gap-5 desktop:grid-cols-2 w-full min-w-0">
      <trend-chart />
      <bar-chart />
    </div>
    <!-- 3️⃣ 图表区域 -->
    <div class="grid grid-cols-1 gap-5 tablet:grid-cols-12 mt-4">
      <!-- 用户分布 -->
      <div class="desktop:col-span-4 tablet:col-span-12">
        <user-map />
      </div>

      <!-- 饼图 -->
      <div class="desktop:col-span-4 tablet:col-span-12">
        <pie-chart />
      </div>
      <div class="desktop:col-span-4 tablet:col-span-12">
        <growth-chart />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Banner,
  StatsCard,
  TrendChart,
  BarChart,
  PieChart,
  UserMap,
  GrowthChart,
} from './components'
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
