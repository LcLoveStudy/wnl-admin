import { ref, watch, type Ref } from 'vue'
import { ConstEnums } from '@/enums/const-enums'
const title = ref('')
watch(
  () => title.value,
  (newValue, oldValue) => {
    if (document && newValue !== oldValue) {
      document.title = newValue
    }
  },
  {
    immediate: true,
  },
)

export const useTitle = (initValue: unknown): Ref<string> => {
  if (typeof initValue === 'string') {
    title.value = `${initValue} - ${ConstEnums.PROJECT_NAME}`
  } else {
    title.value = ConstEnums.PROJECT_NAME
  }
  return title
}
