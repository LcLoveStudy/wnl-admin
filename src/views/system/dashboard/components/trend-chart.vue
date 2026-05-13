<template>
  <el-card shadow="hover">
    <!-- header -->
    <div class="mb-4 text-sm font-semibold text-gray-500 dark:text-gray-400">近30天数据趋势</div>

    <!-- chart -->
    <div ref="chartRef" class="h-72 w-full"></div>
  </el-card>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null

const initChart = () => {
  if (!chartRef.value) return

  chart = echarts.init(chartRef.value)

  chart.setOption({
    backgroundColor: 'transparent',

    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderWidth: 0,
      textStyle: {
        color: '#fff',
      },
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#3b82f6',
          width: 1,
        },
      },
    },

    grid: {
      left: 10,
      right: 10,
      top: 20,
      bottom: 0,
      containLabel: true,
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: Array.from({ length: 30 }).map((_, i) => `${i + 1}`),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#9ca3af',
        fontSize: 11,
      },
    },

    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: {
        lineStyle: {
          color: 'rgba(229, 231, 235, 0.5)',
        },
      },
      axisLabel: {
        color: '#9ca3af',
      },
    },

    series: [
      {
        name: '访问量',
        type: 'line',
        smooth: true,

        data: Array.from({ length: 30 }).map(() => Math.floor(Math.random() * 1200 + 300)),

        symbol: 'circle',
        symbolSize: 6,

        lineStyle: {
          width: 3,
          color: '#3b82f6',
          shadowColor: 'rgba(59, 130, 246, 0.4)',
          shadowBlur: 10,
        },

        itemStyle: {
          color: '#3b82f6',
          borderColor: '#fff',
          borderWidth: 2,
        },

        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(59, 130, 246, 0.35)',
            },
            {
              offset: 1,
              color: 'rgba(59, 130, 246, 0.02)',
            },
          ]),
        },
      },
    ],
  })
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', resize)
})

const resize = () => {
  chart?.resize()
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  chart?.dispose()
})
</script>
