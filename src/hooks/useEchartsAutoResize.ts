import type { ECharts } from 'echarts'

export function useEchartsAutoResize(getChart: () => ECharts | null) {
  let timer: number | null = null
  let raf: number | null = null
  let ro: ResizeObserver | null = null

  const resize = () => {
    const chart = getChart()
    if (!chart) return

    if (timer) clearTimeout(timer)

    timer = window.setTimeout(() => {
      raf = requestAnimationFrame(() => {
        chart.resize()
      })
    }, 150)
  }

  const init = (el: HTMLElement | null) => {
    if (!el) return

    window.addEventListener('resize', resize)

    ro = new ResizeObserver(() => {
      resize()
    })

    ro.observe(el)
  }

  const destroy = () => {
    window.removeEventListener('resize', resize)

    ro?.disconnect()
    ro = null

    if (timer) clearTimeout(timer)
    if (raf) cancelAnimationFrame(raf)
  }

  return { init, destroy }
}
