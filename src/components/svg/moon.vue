<template>
  <svg
    t="1735829091895"
    class="icon"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="6193"
    :width="props.size"
    :height="props.size"
  >
    <path
      d="M644.5056 70.528C834.4064 127.488 972.8 303.5648 972.8 512c0 254.4896-206.3104 460.8-460.8 460.8-222.4128 0-408.0128-157.568-451.2768-367.1296A433.4848 433.4848 0 0 0 230.4 640c240.3584 0 435.2-194.8416 435.2-435.2 0-44.2112-6.5792-86.8608-18.8416-127.0528z"
      p-id="6194"
    ></path>
  </svg>
</template>

<script setup lang="ts">
  const props = defineProps({
    size: {
      type: String,
      default: '18'
    }
  })
</script>
