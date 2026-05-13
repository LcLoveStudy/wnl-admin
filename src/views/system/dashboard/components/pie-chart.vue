<template>
  <el-card shadow="hover">
    <!-- header -->
    <div class="mb-4 text-sm font-semibold text-gray-500 dark:text-gray-400">数据分类占比</div>

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
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderWidth: 0,
      textStyle: {
        color: '#fff',
      },
    },

    legend: {
      bottom: 0,
      textStyle: {
        color: '#9ca3af',
      },
    },

    series: [
      {
        name: '数据占比',
        type: 'pie',
        radius: ['45%', '70%'], // 👉 环形图（更高级）

        avoidLabelOverlap: false,

        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 2,
        },

        label: {
          show: false,
        },

        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
            color: '#111827',
          },
        },

        labelLine: {
          show: false,
        },

        data: [
          { value: 1048, name: '访问' },
          { value: 735, name: '用户' },
          { value: 580, name: '订单' },
          { value: 484, name: '收入' },
        ],

        color: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
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
