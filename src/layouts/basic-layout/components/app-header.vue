<template>
  <header class="h-[50px] border-b border-b-gray-200 flex items-center justify-between px-8">
    <div class="flex items-center"></div>
    <!-- 用户菜单 -->
    <app-user-menu avatar-url="/favicon.ico" />
  </header>
</template>

<script setup lang="ts">
import AppUserMenu from '@/layouts/basic-layout/components/app-user-menu.vue'
</script>
