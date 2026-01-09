<template>
  <div class="flex items-center gap-2.5" :class="containerClass">
    <img :src="logoUrl" alt="logo" class="rounded" :class="imageClass" />
    <div
      class="text-primary transition-transform origin-left ease-in-out"
      :class="[titleClass, showTitle ? 'duration-600 scale-100' : 'scale-0 duration-200']"
    >
      {{ ConstEnums.PROJECT_NAME }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ConstEnums } from '@/enums/const-enums'

interface Props {
  /** Logo 图片地址 */
  logoUrl?: string
  /** 是否显示标题 */
  showTitle?: boolean
  /** 容器自定义类名 */
  containerClass?: string
  /** Logo 图片自定义类名 */
  imageClass?: string
  /** 标题自定义类名 */
  titleClass?: string
}

withDefaults(defineProps<Props>(), {
  logoUrl: '/favicon.ico',
  showTitle: true,
  containerClass: '',
  imageClass: 'w-10 h-10',
  titleClass: 'text-2xl font-medium text-gray-700',
})
</script>

<style scoped></style>
