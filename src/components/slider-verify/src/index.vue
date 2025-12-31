<template>
  <div class="slider_verify_box border-[1px] border-solid border-[#dcdfe6] dark:border-[#334155]">
    <!-- 滑块 -->
    <div ref="rockerDom" class="slider_rocker bg-white dark:bg-[#334155]">
      <el-icon v-if="!isEnd"><SwitchButton /></el-icon>
      <el-icon v-else><Select /></el-icon>
    </div>
    <!-- 未拖拽到的部分 -->
    <div class="fail_bar bg-gray-100 dark:bg-dark-primary"></div>
    <!-- 文字提示 -->
    <span class="verify_tip" :style="{ color: isEnd ? '#fff' : 'transparent' }">
      {{ isEnd ? '验证通过' : '请按住滑块拖动' }}
    </span>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    width: {
      type: String,
      default: '250px'
    }
  })
  const status = defineModel('status', {
    type: Boolean,
    default: false
  })

  const emits = defineEmits(['onSuccess'])

  /** 是否拖拽到底部 */
  const isEnd = ref(false)

  /** 鼠标是否在滑块上 */
  const selectRocker = ref(false)

  /** 滑块的dom */
  const rockerDom = ref<HTMLDivElement>()

  /** 滑块一开始的x值 */
  let rockerInitPlace = 0

  /** 鼠标按下时的x值 */
  let cursorInitPlace = 0

  /** 处理鼠标按下 */
  const mouseDownHandler = (e: MouseEvent) => {
    if (rockerDom.value?.contains(e.target as Node)) {
      cursorInitPlace = e.x
      selectRocker.value = true
    }
  }

  /** 处理鼠标抬起 */
  const mouseUpHandler = () => {
    if (!rockerDom.value) return
    if (selectRocker.value) {
      const sliderBoxDom = document.querySelector('.slider_verify_box') as HTMLDivElement
      selectRocker.value = false
      cursorInitPlace = 0
      if (
        rockerDom.value.style.left !==
        sliderBoxDom?.clientWidth - rockerDom.value.clientWidth + 'px'
      ) {
        const failBarDom = document.querySelector('.fail_bar') as HTMLDivElement
        rockerDom.value.style.transition = 'all 0.5s'
        failBarDom.style.transition = 'all 0.5s'
        failBarDom.style.left = '0px'
        rockerDom.value.style.left = '0px'
        setTimeout(() => {
          if (!rockerDom.value) return
          rockerDom.value.style.transition = 'none'
          failBarDom.style.transition = 'none'
        }, 500)
      } else {
        isEnd.value = true
      }
    }
  }

  /** 处理鼠标移动 */
  const mouseMoveHandler = (e: MouseEvent) => {
    const sliderBoxDom = document.querySelector('.slider_verify_box')
    if (sliderBoxDom?.contains(e.target as Node)) {
      if (selectRocker.value) {
        // 滑块应该移动的距离 = 鼠标目前x - 滑块初始的x - (鼠标按下时的x - 滑块初始的x)
        const moveDistance = e.x - rockerInitPlace - (cursorInitPlace - rockerInitPlace)
        const failBarDom = document.querySelector('.fail_bar') as HTMLDivElement
        failBarDom.style.left =
          moveDistance + (rockerDom.value as HTMLDivElement).clientWidth + 'px'
        if (moveDistance <= 0) {
          isEnd.value = false
          ;(rockerDom.value as HTMLDivElement).style.left = '0px'
        } else if (
          moveDistance >=
          sliderBoxDom?.clientWidth - (rockerDom.value as HTMLDivElement).clientWidth - 10
        ) {
          isEnd.value = true
          ;(rockerDom.value as HTMLDivElement).style.left =
            sliderBoxDom?.clientWidth - (rockerDom.value as HTMLDivElement).clientWidth + 'px'
        } else {
          isEnd.value = false
          ;(rockerDom.value as HTMLDivElement).style.left = moveDistance + 'px'
        }
      }
    } else {
      // 如果鼠标离开了滑块盒子就停止
      mouseUpHandler()
    }
  }

  /** 判断是否是滑块的事件 */
  const isSliderEvent = (e: Event) => {
    return rockerDom.value?.contains(e.target as Node)
  }

  /** 处理触摸事件 - 按下 */
  const touchStartHandler = (e: TouchEvent) => {
    // 只有在滑块上按下时才允许禁用滚动
    if (!isSliderEvent(e)) return
    cursorInitPlace = e.touches[0].clientX
    selectRocker.value = true
    // 禁用默认行为
    e.preventDefault()
  }

  /** 处理触摸事件 - 移动 */
  const touchMoveHandler = (e: TouchEvent) => {
    if (!selectRocker.value || !isSliderEvent(e)) return

    // 禁用默认行为（防止页面滚动）
    e.preventDefault()

    const sliderBoxDom = document.querySelector('.slider_verify_box')
    if (sliderBoxDom?.contains(e.target as Node)) {
      const moveDistance =
        e.touches[0].clientX - rockerInitPlace - (cursorInitPlace - rockerInitPlace)
      const failBarDom = document.querySelector('.fail_bar') as HTMLDivElement
      failBarDom.style.left = moveDistance + (rockerDom.value as HTMLDivElement).clientWidth + 'px'
      if (moveDistance <= 0) {
        isEnd.value = false
        ;(rockerDom.value as HTMLDivElement).style.left = '0px'
      } else if (
        moveDistance >=
        sliderBoxDom?.clientWidth - (rockerDom.value as HTMLDivElement).clientWidth - 10
      ) {
        isEnd.value = true
        ;(rockerDom.value as HTMLDivElement).style.left =
          sliderBoxDom?.clientWidth - (rockerDom.value as HTMLDivElement).clientWidth + 'px'
      } else {
        isEnd.value = false
        ;(rockerDom.value as HTMLDivElement).style.left = moveDistance + 'px'
      }
    }
  }

  /** 处理触摸事件 - 结束 */
  const touchEndHandler = () => {
    if (!rockerDom.value) return
    if (selectRocker.value) {
      selectRocker.value = false
      cursorInitPlace = 0
      const sliderBoxDom = document.querySelector('.slider_verify_box') as HTMLDivElement
      if (
        rockerDom.value.style.left !==
        sliderBoxDom?.clientWidth - rockerDom.value.clientWidth + 'px'
      ) {
        const failBarDom = document.querySelector('.fail_bar') as HTMLDivElement
        rockerDom.value.style.transition = 'all 0.5s'
        failBarDom.style.transition = 'all 0.5s'
        failBarDom.style.left = '0px'
        rockerDom.value.style.left = '0px'
        setTimeout(() => {
          if (!rockerDom.value) return
          rockerDom.value.style.transition = 'none'
          failBarDom.style.transition = 'none'
        }, 500)
      } else {
        isEnd.value = true
      }
    }
  }

  /** 重置 */
  const resetVerify = () => {
    if (!rockerDom.value) return
    const failBarDom = document.querySelector('.fail_bar') as HTMLDivElement
    if (!failBarDom) return
    failBarDom.style.left = '0px'
    rockerDom.value.style.left = '0px'
    isEnd.value = false
  }

  /** 监听完成状态 */
  watch(
    () => isEnd.value,
    () => {
      if (isEnd.value) {
        window.removeEventListener('mousedown', mouseDownHandler)
        window.removeEventListener('mouseup', mouseUpHandler)
        window.removeEventListener('mousemove', mouseMoveHandler)
        window.removeEventListener('touchstart', touchStartHandler)
        window.removeEventListener('touchmove', touchMoveHandler)
        window.removeEventListener('touchend', touchEndHandler)
        status.value = true
        emits('onSuccess')
      } else {
        window.addEventListener('mousedown', mouseDownHandler)
        window.addEventListener('mouseup', mouseUpHandler)
        window.addEventListener('mousemove', mouseMoveHandler)
        window.addEventListener('touchstart', touchStartHandler)
        window.addEventListener('touchmove', touchMoveHandler)
        window.addEventListener('touchend', touchEndHandler)
        status.value = false
      }
    }
  )

  /** 初始化时执行 */
  const rockerMove = () => {
    window.addEventListener('mousedown', mouseDownHandler)
    window.addEventListener('mouseup', mouseUpHandler)
    window.addEventListener('mousemove', mouseMoveHandler)
    window.addEventListener('touchstart', touchStartHandler, { passive: false })
    window.addEventListener('touchmove', touchMoveHandler, { passive: false })
    window.addEventListener('touchend', touchEndHandler, { passive: false })
  }

  onMounted(() => {
    rockerDom.value = document.querySelector('.slider_rocker') as HTMLDivElement
    rockerInitPlace = rockerDom.value.getBoundingClientRect().x
    rockerMove()
  })

  defineExpose({
    name: 'SliderVerify',
    reset: resetVerify
  })

  onBeforeUnmount(() => {
    window.removeEventListener('mousedown', mouseDownHandler)
    window.removeEventListener('mouseup', mouseUpHandler)
    window.removeEventListener('mousemove', mouseMoveHandler)
    window.removeEventListener('touchstart', touchStartHandler)
    window.removeEventListener('touchmove', touchMoveHandler)
    window.removeEventListener('touchend', touchEndHandler)
  })
</script>

<style scoped lang="less">
  .slider_verify_box {
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    min-width: 180px;
    width: v-bind(width);
    height: 45px;
    background-color: #34d399;
    .slider_rocker {
      position: absolute;
      top: 0;
      left: 0;
      cursor: move;
      z-index: 2;
      height: 100%;
      width: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .verify_tip {
      user-select: none;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      font-size: 12px;
      background: linear-gradient(90deg, #000 0%, #fff 50%, #000 100%);
      background-clip: text;
      background-size: 200%;
      animation: lightSweep 4s infinite;
    }

    @keyframes lightSweep {
      0% {
        background-position: -100%;
      }
      50% {
        background-position: 100%;
      }
      100% {
        background-position: -100%;
      }
    }

    .fail_bar {
      position: absolute;
      top: 0;
      height: 100%;
      width: 100%;
    }
  }
</style>
