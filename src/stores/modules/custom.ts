import { LocalStorageKeys } from '@/enums/localstorage'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@/hooks'

/** 菜单样式配置 */
interface MenuStyleConfig {
  /** 菜单是否可见 */
  visible: boolean
  /** 菜单是否折叠 */
  collapsed: boolean
  /** 菜单位置 */
  position: 'sidebar' | 'header' | 'top'
  /** 菜单宽度(展开时) */
  width: number
  /** 菜单宽度(折叠时) */
  collapsedWidth: number
  /** 是否固定菜单 */
  fixed: boolean
}

export const useCustomStore = defineStore('custom', () => {
  const theme = useLocalStorage<'dark' | 'light'>(LocalStorageKeys.THEME, 'light') // 主题色

  /** 菜单样式配置 */
  const menuStyle = useLocalStorage<MenuStyleConfig>(LocalStorageKeys.MENU_STYLE, {
    visible: true, // 菜单默认可见
    collapsed: false, // 菜单默认展开
    position: 'sidebar', // 默认在侧边栏
    width: 225, // 展开时宽度225px
    collapsedWidth: 64, // 折叠时宽度64px
    fixed: true, // 默认固定菜单
  })
  /** 切换默认主题 */
  const toggleTheme = () => {
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
  }

  onMounted(() => {
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })

  /** 菜单样式相关方法 */
  /** 切换菜单可见性 */
  const toggleMenuVisible = () => {
    if (menuStyle.value) {
      menuStyle.value.visible = !menuStyle.value.visible
      // 当菜单隐藏时，宽度保持为0；当显示时，根据折叠状态设置宽度
      if (!menuStyle.value.visible) {
        menuStyle.value.width = 0
      } else {
        menuStyle.value.width = menuStyle.value.collapsed ? 64 : 225
      }
    }
  }

  /** 切换菜单折叠状态 */
  const toggleMenuCollapsed = () => {
    if (menuStyle.value) {
      menuStyle.value.collapsed = !menuStyle.value.collapsed
      // 根据折叠状态设置宽度
      if (menuStyle.value.visible) {
        menuStyle.value.width = menuStyle.value.collapsed ? 64 : 225
      }
    }
  }

  /** 设置菜单位置 */
  const setMenuPosition = (position: MenuStyleConfig['position']) => {
    if (menuStyle.value) {
      menuStyle.value.position = position
    }
  }

  return {
    theme,
    toggleTheme,
    menuStyle,
    toggleMenuVisible,
    toggleMenuCollapsed,
    setMenuPosition,
  }
})
