export const useThemeTransition = () => {
  /**
   * 开始切换主题
   * @param isDark 是否是黑暗主题
   * @param beforeCb 切换主题前的回调
   * @returns
   */
  const start = (
    dom: HTMLElement,
    isDark: boolean,
    beforeCb?: () => void,
    afterCb?: () => void,
  ) => {
    const transition = document.startViewTransition(() => {
      document.documentElement.classList.toggle('dark')
      beforeCb && beforeCb()
    })
    if (!dom) return
    const { x, y } = dom.getBoundingClientRect()
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    transition.ready
      .then(() => {
        if (isDark) {
          document.documentElement.animate(
            {
              clipPath: [`circle(0% at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
            },
            {
              duration: 600,
              pseudoElement: '::view-transition-new(root)',
            },
          )
        } else {
          document.documentElement.animate(
            {
              zIndex: [99999, 99999],
              clipPath: [`circle(${radius}px at ${x}px ${y}px)`, `circle(0% at ${x}px ${y}px)`],
            },
            {
              duration: 600,
              pseudoElement: '::view-transition-old(root)',
            },
          )
        }
      })
      .finally(() => {
        afterCb && afterCb
      })
  }
  return {
    start,
  }
}
