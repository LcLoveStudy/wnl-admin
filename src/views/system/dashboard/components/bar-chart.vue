<template>
  <el-card shadow="hover" class="w-full overflow-hidden">
    <div
      class="mb-4 desktop:text-sm tablet:text-xl phone:text-xl font-semibold text-gray-500 dark:text-gray-400"
    >
      近7天订单统计
    </div>

    <div class="relative h-72 w-full overflow-hidden">
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

const initChart = () => {
  if (!chartRef.value) return

  chart = echarts.init(chartRef.value)

  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderWidth: 0,
      textStyle: {
        color: '#fff',
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
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
        name: '订单量',
        type: 'bar',
        barWidth: 22,
        data: [180, 240, 210, 320, 390, 280, 350],
        itemStyle: {
          borderRadius: [8, 8, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#34d399',
            },
            {
              offset: 1,
              color: '#10b981',
            },
          ]),
        },
      },
    ],
  })

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
