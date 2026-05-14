<template>
  <el-card shadow="hover">
    <div class="mb-4 flex items-center justify-between">
      <div class="text-sm font-semibold text-gray-500 dark:text-gray-400">用户分布（全国）</div>
    </div>

    <div class="w-full h-72 overflow-hidden relative">
      <div ref="chartRef" class="absolute inset-0"></div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import ChinaMap from '@/assets/map/china.json'
import * as echarts from 'echarts'
import type { GeoJSONSourceInput } from 'echarts/types/src/coord/geo/geoTypes.js'
import { useEchartsAutoResize } from '@/hooks'

const chartRef = useTemplateRef<HTMLDivElement | null>('chartRef')
let chart: echarts.ECharts | null = null

const { init, destroy } = useEchartsAutoResize(() => chart)

const points = [
  { name: '新疆', value: [86, 40] },
  { name: '西藏', value: [89, 31] },
  { name: '四川', value: [102, 31] },
  { name: '云南', value: [102, 24] },
  { name: '宁夏', value: [106.5, 37.8] },
  { name: '贵州', value: [106, 26] },
  { name: '内蒙古', value: [115, 43] },
  { name: '黑龙江', value: [127, 47] },
  { name: '吉林', value: [125, 44] },
  { name: '北京', value: [116.5, 40.3] },
  { name: '河北', value: [115, 38] },
  { name: '山东', value: [118, 36] },
  { name: '河南', value: [113, 34] },
  { name: '江苏', value: [119, 33.5] },
  { name: '浙江', value: [120, 29] },
]

const linesGenertor = () => {
  return points.map((point) => ({
    fromName: '',
    toName: '',
    coords: [[100, 36], point.value],
  }))
}

const initChart = async () => {
  await nextTick()
  if (!chartRef.value) return

  echarts.registerMap('china', ChinaMap as unknown as GeoJSONSourceInput)

  chart = echarts.init(chartRef.value)

  chart.setOption({
    tooltip: { show: false },

    geo: [
      {
        map: 'china',
        layoutCenter: ['50%', '50%'],
        layoutSize: '100%',
        zoom: 1,
        selectedMode: false,
        emphasis: { disabled: true },
        z: 2,
        itemStyle: {
          borderColor: '#718AFE',
          borderWidth: 3,
          areaColor: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#53B8FD' },
              { offset: 1, color: '#5FA6FF' },
            ],
          },
        },
      },
      {
        map: 'china',
        layoutCenter: ['50%', '50%'],
        layoutSize: '100%',
        zoom: 1,
        selectedMode: false,
        emphasis: { disabled: true },
        z: 1,
        itemStyle: {
          shadowColor: '#07CAFF',
          shadowOffsetX: 2,
          shadowOffsetY: 8,
          borderColor: 'transparent',
        },
      },
      {
        map: 'china',
        layoutCenter: ['50%', '50%'],
        layoutSize: '100%',
        zoom: 1,
        selectedMode: false,
        emphasis: { disabled: true },
        z: 0,
        itemStyle: {
          shadowColor: '#4294F4',
          shadowOffsetX: 2,
          shadowOffsetY: 12,
          borderColor: 'transparent',
        },
      },
    ],

    series: [
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        itemStyle: { color: '#41FFE5' },
        rippleEffect: { number: 4, scale: 4 },
        data: [{ name: '青海', value: [100, 36] }],
      },

      {
        type: 'scatter',
        coordinateSystem: 'geo',
        zlevel: 10,
        itemStyle: { color: '#41FFE5' },
        symbolSize: 8,
        label: {
          show: true,
          position: 'top',
          formatter: '{b}',
          color: '#fff',
          fontSize: 10,
          distance: 2,
        },
        data: [
          ...points,
          {
            name: '青海',
            value: [100, 36],
            symbolSize: 10,
            itemStyle: { color: '#F63D8C' },
          },
        ],
      },

      {
        type: 'lines',
        zlevel: 1,
        effect: {
          show: true,
          period: 10,
          trailLength: 0.1,
          color: '#41FFE5',
          symbolSize: 6,
        },
        lineStyle: {
          color: '#41FFE5',
          width: 1,
          curveness: 0.2,
        },
        data: linesGenertor(),
      },
    ],
  })

  // ⭐关键：统一交给 hook 管
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
