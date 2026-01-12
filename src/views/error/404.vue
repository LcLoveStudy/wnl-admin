<template>
  <error-page
    error-code="404"
    title="页面不存在"
    description="抱歉，您访问的页面不存在"
    code-color="text-blue-500"
    :actions="actions"
  />
</template>

<script setup lang="ts">
import ErrorPage from '@/components/error-page'

const router = useRouter()

const actions = [
  {
    key: 'home',
    label: '返回首页',
    primary: true,
    handler: () => router.push('/'),
  },
]
</script>
