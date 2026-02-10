import { LocalStorageKeys } from '@/enums/localstorage'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@/hooks'

/** 侧边栏配置 */
interface SidebarConfig {
  /** 侧边栏是否可见 */
  visible: boolean
  /** 侧边栏是否折叠 */
  collapsed: boolean
  /** 侧边栏宽度(展开时) */
  width: number
  /** 侧边栏宽度(折叠时) */
  collapsedWidth: number
}

/** 菜单样式配置 */
interface MenuStyleConfig {
  /** 菜单主题 */
  theme: 'light' | 'dark'
}

/** 布局配置 */
interface LayoutConfig {
  /** 侧边栏配置 */
  sidebar: SidebarConfig
  /** 菜单配置 */
  menu: MenuStyleConfig
}

export const useCustomStore = defineStore('custom', () => {
  const theme = useLocalStorage<'dark' | 'light'>(LocalStorageKeys.THEME, 'light') // 主题色

  /** 布局配置 */
  const layoutConfig = useLocalStorage<LayoutConfig>(LocalStorageKeys.LAYOUT_STYLE, {
    sidebar: {
      visible: true, // 侧边栏默认可见
      collapsed: false, // 侧边栏默认展开
      width: 225, // 展开时宽度225px
      collapsedWidth: 64, // 折叠时宽度64px
    },
    menu: {
      theme: 'dark', // 默认深色主题
    },
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

  /** 布局相关方法 */
  /** 切换侧边栏可见性 */
  const toggleSidebarVisible = () => {
    if (layoutConfig.value) {
      layoutConfig.value.sidebar.visible = !layoutConfig.value.sidebar.visible
      // 当侧边栏隐藏时，设置很小的宽度用于动画；当显示时，根据折叠状态设置宽度
      if (!layoutConfig.value.sidebar.visible) {
        layoutConfig.value.sidebar.width = 0 // 设置很小的宽度用于动画过渡
      } else {
        layoutConfig.value.sidebar.width = layoutConfig.value.sidebar.collapsed
          ? layoutConfig.value.sidebar.collapsedWidth
          : 225
      }
    }
  }

  /** 切换侧边栏折叠状态 */
  const toggleSidebarCollapsed = () => {
    if (layoutConfig.value) {
      layoutConfig.value.sidebar.collapsed = !layoutConfig.value.sidebar.collapsed
      // 根据折叠状态设置宽度
      if (layoutConfig.value.sidebar.visible) {
        layoutConfig.value.sidebar.width = layoutConfig.value.sidebar.collapsed
          ? layoutConfig.value.sidebar.collapsedWidth
          : 225
      }
    }
  }

  return {
    theme,
    toggleTheme,
    layoutConfig,
    toggleSidebarVisible,
    toggleSidebarCollapsed,
  }
})
