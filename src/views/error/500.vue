<template>
  <error-page
    error-code="500"
    title="服务器错误"
    description="抱歉，服务器出现了一些问题，请稍后重试"
    code-color="text-yellow-500"
    :actions="actions"
  />
</template>

<script setup lang="ts">
import ErrorPage from '@/components/error-page'

const router = useRouter()

const actions = [
  {
    key: 'refresh',
    label: '刷新页面',
    primary: true,
    handler: () => window.location.reload(),
  },
  {
    key: 'home',
    label: '返回首页',
    primary: false,
    handler: () => router.push('/'),
  },
]
</script>
