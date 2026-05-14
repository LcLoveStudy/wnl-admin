<template>
  <el-card shadow="hover">
    <div class="mb-4 text-sm font-semibold text-gray-500 dark:text-gray-400">数据分类占比</div>

    <div class="w-full h-72 overflow-hidden relative">
      <div ref="chartRef" class="absolute inset-0"></div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { useEchartsAutoResize } from '@/hooks'

const chartRef = useTemplateRef<HTMLDivElement | null>('chartRef')
let chart: echarts.ECharts | null = null

const { init, destroy } = useEchartsAutoResize(() => chart)

const initChart = async () => {
  await nextTick()
  if (!chartRef.value) return

  chart = echarts.init(chartRef.value)

  chart.setOption({
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderWidth: 0,
      textStyle: { color: '#fff' },
    },

    legend: {
      bottom: 0,
      textStyle: { color: '#9ca3af' },
    },

    series: [
      {
        name: '数据占比',
        type: 'pie',
        center: ['50%', '40%'],
        radius: ['45%', '70%'],

        avoidLabelOverlap: false,

        itemStyle: {
          borderRadius: 6,
          borderColor: 'transparent',
          borderWidth: 1,
        },

        label: { show: false },

        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
            color: '#111827',
          },
          itemStyle: {
            borderColor: 'rgba(59,130,246,0.4)',
            borderWidth: 2,
          },
        },

        labelLine: { show: false },

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

  // ⭐ 关键：初始化后交给统一 hook 管理 resize
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
