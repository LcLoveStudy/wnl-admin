<template>
  <main class="flex-1">
    <slot>
      <!-- 默认插槽：用于 router-view 或页面内容 -->
      <router-view />
    </slot>
  </main>
</template>

<script setup lang="ts"></script>
