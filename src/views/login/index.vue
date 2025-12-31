<template>
  <div class="h-full grid tablet:grid-cols-[2fr_1fr]">
    <!-- 左边背景 -->
    <div
      :class="[
        'primary_box phone:hidden tablet:flex items-center justify-center',
        theme === 'dark' ? 'bg-img-dark' : 'bg-img-light',
      ]"
    >
      <img class="w-1/3 select-none primary_img" :src="PrimaryImg" />
    </div>
    <!-- 右边表单 -->
    <form-side />
  </div>
</template>

<script setup lang="ts">
import PrimaryImg from '@/assets/images/login/primary.png'
import { FormSide } from './components'
import { useCustomStore } from '@/stores'
import { storeToRefs } from 'pinia'

const { theme } = storeToRefs(useCustomStore())
</script>

<style lang="less" scoped>
.primary_box {
  @keyframes riseAndFall {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }
  .primary_img {
    animation: riseAndFall 2s infinite;
  }
}
</style>

<style lang="less" scoped>
.bg-img-light {
  background-image: radial-gradient(
    circle at center,
    #f8fafc 0%,
    #f8fafc 25%,
    #dbeafe 50%,
    #f8fafc 75%,
    #f8fafc 100%
  );
}

.bg-img-dark {
  background-image: radial-gradient(
    circle at center,
    black 0%,
    black 25%,
    #1e2a47 50%,
    black 75%,
    black 100%
  );
}
</style>
