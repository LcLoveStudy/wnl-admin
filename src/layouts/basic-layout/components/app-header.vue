<template>
  <header class="h-[50px] border-b border-b-gray-200 flex items-center justify-between px-8">
    <div class="flex items-center"></div>
    <div class="flex items-center space-x-4">
      <theme-checkout container-class="w-8 h-8 hover:bg-gray-100 transition-colors rounded-full" />
      <!-- 用户菜单 -->
      <app-user-menu avatar-url="/favicon.ico" />
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeCheckout from '@/components/theme-checkout/index.vue'
import AppUserMenu from '@/layouts/basic-layout/components/app-user-menu.vue'
</script>
