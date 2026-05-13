<template>
  <el-card shadow="hover">
    <!-- header -->
    <div class="mb-4 flex items-center justify-between">
      <div class="text-sm font-semibold text-gray-500 dark:text-gray-400">用户分布（全国）</div>

      <div class="text-xs text-gray-400">3D Style Map</div>
    </div>

    <!-- 双层地图容器 -->
    <div ref="chartRef" class="h-[460px] w-full"></div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement | null>(null)
let chart: echarts.ECharts | null = null

const linesGenertor = () => {
  const lines: { fromName: number; toName: number; coords: number[][] }[] = []
  points.forEach((point) => {
    lines.push({
      fromName: 1,
      toName: 1,
      coords: [[100, 36], point.value],
    })
  })
  return lines
}
const points = [
  {
    name: '新疆',
    value: [86, 40],
  },
  {
    name: '西藏',
    value: [89, 31],
  },
  {
    name: '四川',
    value: [102, 31],
  },
  {
    name: '云南',
    value: [102, 24],
  },
  {
    name: '宁夏',
    value: [106.5, 37.8],
  },
  {
    name: '贵州',
    value: [106, 26],
  },
  {
    name: '内蒙古',
    value: [115, 43],
  },
  {
    name: '黑龙江',
    value: [127, 47],
  },
  {
    name: '吉林',
    value: [125, 44],
  },
  {
    name: '北京',
    value: [116.5, 40.3],
  },
  {
    name: '河北',
    value: [115, 38],
  },
  {
    name: '山东',
    value: [118, 36],
  },
  {
    name: '河南',
    value: [113, 34],
  },
  {
    name: '江苏',
    value: [119, 33.5],
  },
  {
    name: '浙江',
    value: [120, 29],
  },
]

const initChart = async () => {
  await nextTick()
  if (!chartRef.value) return

  chart = echarts.init(chartRef.value)

  const res = await fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
  const chinaMap = await res.json()

  echarts.registerMap('china', chinaMap)

  chart.setOption({
    tooltip: {
      show: false,
    },
    geo: [
      {
        map: 'china',
        zoom: 1.25,
        center: [104, 36],

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
        zoom: 1.25,
        center: [104, 36],

        selectedMode: false,
        emphasis: { disabled: true },

        itemStyle: {
          shadowColor: '#07CAFF',
          shadowOffsetX: 2,
          shadowOffsetY: 8,
          borderColor: 'transparent',
        },

        z: 1,
      },

      {
        map: 'china',
        zoom: 1.25,
        center: [104, 36],

        selectedMode: false,
        emphasis: { disabled: true },

        itemStyle: {
          shadowColor: '#4294F4',
          shadowOffsetX: 2,
          shadowOffsetY: 12,
          borderColor: 'transparent',
        },

        z: 0,
      },
    ],
    series: [
      /** 青海点的扩散 */
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        itemStyle: {
          color: '#41FFE5',
        },
        rippleEffect: {
          number: 4,
          scale: 10,
        },
        label: {
          show: false,
        },
        data: [
          {
            name: '青海',
            value: [100, 36],
          },
        ],
      },
      /** 坐标点 */
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        itemStyle: {
          color: '#41FFE5',
        },
        label: {
          show: true,
          position: 'top',
          formatter: '{b}',
          color: '#fff', // 可自定义文字颜色
          fontSize: 16, // 可自定义字号
        },
        zlevel: 10,
        data: [
          ...points,
          {
            name: '青海',
            value: [100, 36],
            symbolSize: 15,
            itemStyle: {
              color: '#F63D8C',
            },
          },
        ],
      },
      /** 轨迹 */
      {
        type: 'lines',
        zlevel: 1, //设置这个才会有轨迹线的小尾巴
        effect: {
          show: true,
          period: 10,
          trailLength: 0.1,
          color: '#41FFE5',
          symbolSize: 6,
        },
        lineStyle: {
          normal: {
            color: '#41FFE5',
            width: 1,
            curveness: 0.2,
            shadowColor: '#41FFE5',
          },
        },
        data: linesGenertor(),
      },
    ],
  })

  window.addEventListener('resize', resize)
}

const resize = () => {
  chart?.resize()
}

onMounted(() => {
  initChart()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  chart?.dispose()
})
</script>
