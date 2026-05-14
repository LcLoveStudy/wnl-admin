<template>
  <el-card shadow="hover">
    <div class="mb-4 text-sm font-semibold text-gray-500 dark:text-gray-400">
      用户 / 订单增长趋势
    </div>

    <div ref="chartRef" class="h-72 w-full"></div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null

const initChart = () => {
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
}

const resize = () => chart?.resize()

onMounted(() => {
  initChart()
  window.addEventListener('resize', resize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  chart?.dispose()
})
</script>
