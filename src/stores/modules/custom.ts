import { ref } from 'vue'
import { LocalStorageKeys } from '@/enums/localstorage'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@/hooks'

export const useCustomStore = defineStore('custom', () => {
  const asideMenuFold = ref(false)
  const theme = useLocalStorage<'dark' | 'light'>(LocalStorageKeys.THEME, 'light') // 主题色
  /** 切换默认主题 */
  const checkoutTheme = () => {
    const transition = document.startViewTransition(() => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark')
    })
    const btnDom = document.querySelector('.theme-btn') as HTMLElement
    if (!btnDom) return
    const { x, y } = btnDom.getBoundingClientRect()
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    transition.ready.then(() => {
      if (theme.value === 'dark') {
        document.documentElement.animate(
          {
            clipPath: [`circle(0% at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`]
          },
          {
            duration: 600,
            pseudoElement: '::view-transition-new(root)'
          }
        )
      } else {
        document.documentElement.animate(
          {
            zIndex: [99999, 99999],
            clipPath: [`circle(${radius}px at ${x}px ${y}px)`, `circle(0% at ${x}px ${y}px)`]
          },
          {
            duration: 600,
            pseudoElement: '::view-transition-old(root)'
          }
        )
      }
    })
  }

  onMounted(() => {
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })

  return { asideMenuFold, theme, checkoutTheme }
})
