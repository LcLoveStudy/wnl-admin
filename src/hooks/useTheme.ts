import { useCustomStore } from '@/stores'
import { storeToRefs } from 'pinia'
/** 获取当前主题 */
export const useTheme = () => {
  const { theme } = storeToRefs(useCustomStore())
  onMounted(() => {
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })
  return {
    theme: readonly(theme),
  }
}
