import './index.less'
import type { DirectiveObject } from '..'
export const lazy: DirectiveObject<string> = {
  name: 'lazy',
  method: {
    mounted(el: HTMLElement, value) {
      el.classList.add('lazy-skeleton')
      el.dataset.src = value.value
      observer.observe(el)
    },
  },
}
// 监听处理函数
const handler = (entries: Array<IntersectionObserverEntry>) => {
  entries.forEach((entry) => {
    // 进入视野后进一步处理
    if (entry.isIntersecting) {
      const img = entry.target as HTMLImageElement
      const realSrc = img.dataset.src!

      const temp = new Image()

      temp.src = realSrc

      // 加载成功
      temp.onload = () => {
        img.src = realSrc
        img.classList.remove('lazy-skeleton')
      }

      // 加载失败
      temp.onerror = () => {
        img.classList.remove('lazy-skeleton')
      }

      observer.unobserve(img)
    }
  })
}

// 监听器
const observer = new IntersectionObserver(handler, { threshold: [0.25, 1] })
