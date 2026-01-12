<template>
  <error-page
    error-code="403"
    title="权限不足"
    description="抱歉，您没有权限访问此页面"
    code-color="text-red-500"
    :actions="actions"
  />
</template>

<script setup lang="ts">
import ErrorPage from '@/components/error-page'

const router = useRouter()

const actions = [
  {
    key: 'back',
    label: '返回上一页',
    primary: true,
    handler: () => router.go(-1),
  },
  {
    key: 'home',
    label: '返回首页',
    primary: false,
    handler: () => router.push('/'),
  },
]
</script>
