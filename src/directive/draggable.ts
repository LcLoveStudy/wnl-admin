import type { DirectiveObject } from '.'

/**
 * 拖拽边界类型
 *
 * window  -> 限制在浏览器窗口内
 * parent  -> 限制在父元素内
 * HTMLElement -> 指定 DOM 容器
 * string -> CSS 选择器
 */
type Boundary = 'window' | 'parent' | HTMLElement | string

/**
 * v-draggable 指令配置项
 */
interface DraggableOptions {
  /**
   * 拖拽边界
   * 默认：window
   *
   * 示例：
   * boundary: 'window'
   * boundary: 'parent'
   * boundary: document.querySelector('.container')
   * boundary: '.container'
   */
  boundary?: Boundary

  /**
   * 网格吸附(px)
   *
   * 示例：
   * snap: 20
   *
   * 拖拽位置会自动吸附到 20px 的网格
   */
  snap?: number

  /**
   * 拖拽方向限制
   *
   * x    -> 只能水平拖动
   * y    -> 只能垂直拖动
   * both -> 自由拖动（默认）
   */
  axis?: 'x' | 'y' | 'both'

  /**
   * 指定拖拽触发区域（CSS 选择器）
   *
   * 示例：
   * handle: '.header'
   *
   * 只有点击 .header 才能拖动
   */
  handle?: string

  /**
   * 拖拽过程回调
   */
  onDrag?: (pos: { x: number; y: number }) => void
}

interface DraggableElement extends HTMLElement {
  _dragHandler?: (e: MouseEvent) => void
}

export const draggable: DirectiveObject<DraggableOptions> = {
  name: 'draggable',

  method: {
    mounted(el: HTMLElement, binding) {
      const options = binding.value || {}

      // 默认限制在 window
      const boundary = options.boundary ?? 'window'

      // 默认允许 x + y
      const axis = options.axis ?? 'both'

      // 如果元素没有定位，设置 absolute
      el.style.position = el.style.position || 'absolute'

      let startX = 0
      let startY = 0
      let startLeft = 0
      let startTop = 0

      /**
       * 解析 boundary 为 DOMRect
       */
      const resolveBoundary = () => {
        if (boundary === 'window') {
          return {
            left: 0,
            top: 0,
            right: window.innerWidth,
            bottom: window.innerHeight,
          }
        }

        if (boundary === 'parent') {
          return el.parentElement?.getBoundingClientRect()
        }

        if (boundary instanceof HTMLElement) {
          return boundary.getBoundingClientRect()
        }

        if (typeof boundary === 'string') {
          const dom = document.querySelector(boundary)
          return dom?.getBoundingClientRect()
        }

        return null
      }

      /**
       * 鼠标移动
       */
      const mouseMoveHandler = (e: MouseEvent) => {
        const dx = e.clientX - startX
        const dy = e.clientY - startY

        let left = startLeft + dx
        let top = startTop + dy

        // 限制拖拽方向
        if (axis === 'x') {
          top = startTop
        }

        if (axis === 'y') {
          left = startLeft
        }

        /**
         * 网格吸附
         */
        if (options.snap) {
          const snap = options.snap
          left = Math.round(left / snap) * snap
          top = Math.round(top / snap) * snap
        }

        /**
         * 边界限制
         */
        const boundaryRect = resolveBoundary()

        if (boundaryRect) {
          const elRect = el.getBoundingClientRect()

          const minLeft = boundaryRect.left + window.scrollX
          const minTop = boundaryRect.top + window.scrollY
          const maxLeft = boundaryRect.right - elRect.width + window.scrollX
          const maxTop = boundaryRect.bottom - elRect.height + window.scrollY

          left = Math.max(minLeft, Math.min(left, maxLeft))
          top = Math.max(minTop, Math.min(top, maxTop))
        }

        // 更新位置
        el.style.left = `${left}px`
        el.style.top = `${top}px`

        // 触发回调
        options.onDrag?.({ x: left, y: top })
      }

      /**
       * 鼠标释放
       */
      const mouseUpHandler = () => {
        document.removeEventListener('mousemove', mouseMoveHandler)
        document.removeEventListener('mouseup', mouseUpHandler)
      }

      /**
       * 鼠标按下
       */
      const mouseDownHandler = (e: MouseEvent) => {
        // handle 限制
        const handle = options.handle ? el.querySelector(options.handle) : el

        // 如果点击的不是 handle，则不触发拖拽
        if (handle && !handle.contains(e.target as Node)) return

        startX = e.clientX
        startY = e.clientY

        const rect = el.getBoundingClientRect()

        startLeft = rect.left + window.scrollX
        startTop = rect.top + window.scrollY

        document.addEventListener('mousemove', mouseMoveHandler)
        document.addEventListener('mouseup', mouseUpHandler)
      }

      // 监听鼠标按下
      el.addEventListener('mousedown', mouseDownHandler)

      // 保存 handler 方便卸载
      ;(el as DraggableElement)._dragHandler = mouseDownHandler
    },

    /**
     * 指令卸载
     */
    unmounted(el: HTMLElement) {
      const handler = (el as DraggableElement)._dragHandler

      if (handler) {
        el.removeEventListener('mousedown', handler)
      }
    },
  },
}
