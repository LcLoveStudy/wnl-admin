<template>
  <div
    class="inline-flex items-center justify-center overflow-hidden cursor-pointer transition-shadow"
    :class="[avatarClass, { 'hover:shadow-lg hover:shadow-gray-300': clickable }]"
    :style="{ width: `${size}px`, height: `${size}px` }"
    @click="handleClick"
  >
    <img
      v-if="avatarUrl"
      :src="avatarUrl"
      :alt="alt"
      class="w-full h-full object-cover"
      @error="handleError"
    />
    <div
      v-else
      class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 font-medium"
      :style="{ fontSize: `${size * 0.4}px` }"
    >
      {{ displayText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores'

interface Props {
  /** 头像图片地址 */
  avatarUrl?: string
  /** 头像尺寸（px） */
  size?: number
  /** 是否可点击 */
  clickable?: boolean
  /** 图片 alt 属性 */
  alt?: string
  /** 自定义类名 */
  avatarClass?: string
  /** 是否使用用户信息中的头像 */
  useUserInfo?: boolean
  /** 默认显示文本（当没有头像时） */
  defaultText?: string
}

const props = withDefaults(defineProps<Props>(), {
  avatarUrl: '',
  size: 40,
  clickable: true,
  alt: 'avatar',
  avatarClass: 'rounded-full',
  useUserInfo: true,
  defaultText: '',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const userStore = useUserStore()

// 计算最终使用的头像地址
const finalAvatarUrl = computed(() => {
  if (props.avatarUrl) return props.avatarUrl
  if (props.useUserInfo && userStore.userinfo?.avatar) {
    return userStore.userinfo.avatar
  }
  return ''
})

// 计算默认显示文本
const displayText = computed(() => {
  if (props.defaultText) return props.defaultText
  if (props.useUserInfo && userStore.userinfo?.username) {
    return userStore.userinfo.username.charAt(0).toUpperCase()
  }
  return 'U'
})

// 图片加载错误处理
const handleError = () => {
  // 可以在这里设置默认头像或触发错误事件
}

// 点击事件处理
const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

<style scoped></style>
