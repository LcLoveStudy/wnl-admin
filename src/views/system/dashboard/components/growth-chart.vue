<template>
  <el-card shadow="hover">
    <div class="mb-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
      用户 / 订单增长趋势
    </div>

    <div class="w-full h-72 overflow-hidden relative">
      <div ref="chartRef" class="absolute inset-0"></div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { useEchartsAutoResize } from '@/hooks'

const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null

const { init, destroy } = useEchartsAutoResize(() => chart)

const initChart = async () => {
  await nextTick()
  if (!chartRef.value) return

  chart = echarts.init(chartRef.value)

  chart.setOption({
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17,24,39,0.9)',
      borderWidth: 0,
      textStyle: { color: '#fff' },
    },

    legend: {
      top: 0,
      textStyle: { color: '#9ca3af' },
    },

    grid: {
      left: 10,
      right: 10,
      top: 40,
      bottom: 10,
      containLabel: true,
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: Array.from({ length: 7 }).map((_, i) => `D${i + 1}`),
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisLabel: { color: '#9ca3af' },
    },

    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisLabel: { color: '#9ca3af' },
      splitLine: { lineStyle: { color: '#f3f4f6' } },
    },

    series: [
      {
        name: '用户增长',
        type: 'line',
        smooth: true,
        data: [120, 200, 150, 280, 300, 420, 500],
        lineStyle: { width: 3 },
        areaStyle: { opacity: 0.1 },
        symbol: 'circle',
      },
      {
        name: '订单增长',
        type: 'line',
        smooth: true,
        data: [80, 160, 130, 220, 260, 380, 450],
        lineStyle: { width: 3 },
        areaStyle: { opacity: 0.08 },
        symbol: 'circle',
      },
    ],
  })

  // ⭐ 关键：统一 resize 管理
  init(chartRef.value)
}

onMounted(() => {
  initChart()
})

onBeforeUnmount(() => {
  destroy()
  chart?.dispose()
  chart = null
})
</script>
