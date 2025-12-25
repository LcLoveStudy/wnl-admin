type Options = {
  designWidth?: number // 设计稿宽度
  baseFontSize?: number // 设计稿下的根字体大小
  minFontSize?: number // 最小 font-size
}

export function setRootFontSize(options: Options = {}) {
  const { designWidth = 1920, baseFontSize = 16, minFontSize = 10 } = options

  const docEl = document.documentElement

  const resize = () => {
    const clientWidth = docEl.clientWidth
    if (!clientWidth) return

    let fontSize = (clientWidth / designWidth) * baseFontSize

    // 只限制最小值，不限制最大值
    fontSize = Math.max(minFontSize, fontSize)

    docEl.style.fontSize = `${fontSize}px`
  }

  // 确保 DOM 已加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', resize)
  } else {
    resize()
  }

  window.addEventListener('resize', resize)

  // 切换标签页回来时重新计算
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      resize()
    }
  })
}
