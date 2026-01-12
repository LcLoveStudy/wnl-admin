<template>
  <div class="error-page">
    <div class="error-content">
      <div class="error-code">403</div>
      <h1 class="error-title">权限不足</h1>
      <p class="error-description">抱歉，您没有权限访问此页面</p>
      <el-button type="primary" @click="goBack">返回上一页</el-button>
      <el-button @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.error-content {
  text-align: center;
}

.error-code {
  font-size: 72px;
  font-weight: bold;
  color: #f56c6c;
  margin-bottom: 24px;
}

.error-title {
  font-size: 24px;
  margin-bottom: 16px;
}

.error-description {
  color: #666;
  margin-bottom: 32px;
}
</style>
