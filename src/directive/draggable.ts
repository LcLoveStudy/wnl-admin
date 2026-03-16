import type { DirectiveObject } from '.'

type Boundary = 'window' | 'parent' | HTMLElement | string

interface DraggableOptions {
  boundary?: Boundary
  snap?: number
  axis?: 'x' | 'y' | 'both'
  handle?: string
  onDrag?: (pos: { x: number; y: number }) => void
}

interface DraggableElement extends HTMLElement {
  _dragHandler?: (e: MouseEvent) => void
}

const getStyleNumber = (el: HTMLElement, prop: 'left' | 'top') => {
  const value = window.getComputedStyle(el)[prop]
  const num = parseFloat(value)
  return Number.isNaN(num) ? 0 : num
}

export const draggable: DirectiveObject<DraggableOptions> = {
  name: 'draggable',

  method: {
    mounted(el: HTMLElement, binding) {
      const options = binding.value || {}

      const boundary = options.boundary ?? 'window'
      const axis = options.axis ?? 'both'

      const dragEl = el as DraggableElement

      const position = getComputedStyle(el).position
      if (!['absolute', 'fixed', 'relative'].includes(position)) {
        el.style.position = 'absolute'
      }

      let startX = 0
      let startY = 0
      let startLeft = 0
      let startTop = 0

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
          const parent = el.parentElement
          return parent?.getBoundingClientRect() ?? null
        }

        if (boundary instanceof HTMLElement) {
          return boundary.getBoundingClientRect()
        }

        if (typeof boundary === 'string') {
          const dom = document.querySelector(boundary)
          return dom?.getBoundingClientRect() ?? null
        }

        return null
      }

      const mouseMoveHandler = (e: MouseEvent) => {
        const dx = e.clientX - startX
        const dy = e.clientY - startY

        let left = startLeft + dx
        let top = startTop + dy

        if (axis === 'x') top = startTop
        if (axis === 'y') left = startLeft

        if (options.snap) {
          const snap = options.snap
          left = Math.round(left / snap) * snap
          top = Math.round(top / snap) * snap
        }

        const boundaryRect = resolveBoundary()

        if (boundaryRect) {
          const elRect = el.getBoundingClientRect()

          const parentRect = el.offsetParent?.getBoundingClientRect() ?? {
            left: 0,
            top: 0,
          }

          const minLeft = boundaryRect.left - parentRect.left
          const minTop = boundaryRect.top - parentRect.top

          const maxLeft = boundaryRect.right - parentRect.left - elRect.width

          const maxTop = boundaryRect.bottom - parentRect.top - elRect.height

          left = Math.max(minLeft, Math.min(left, maxLeft))
          top = Math.max(minTop, Math.min(top, maxTop))
        }

        el.style.left = `${left}px`
        el.style.top = `${top}px`

        options.onDrag?.({ x: left, y: top })
      }

      const mouseUpHandler = () => {
        document.removeEventListener('mousemove', mouseMoveHandler)
        document.removeEventListener('mouseup', mouseUpHandler)
      }

      const mouseDownHandler = (e: MouseEvent) => {
        const handle = options.handle ? el.querySelector(options.handle) : el

        if (handle && !handle.contains(e.target as Node)) return

        startX = e.clientX
        startY = e.clientY

        startLeft = getStyleNumber(el, 'left')
        startTop = getStyleNumber(el, 'top')

        document.addEventListener('mousemove', mouseMoveHandler)
        document.addEventListener('mouseup', mouseUpHandler)
      }

      el.addEventListener('mousedown', mouseDownHandler)

      dragEl._dragHandler = mouseDownHandler
    },

    unmounted(el: HTMLElement) {
      const dragEl = el as DraggableElement

      if (dragEl._dragHandler) {
        el.removeEventListener('mousedown', dragEl._dragHandler)
      }
    },
  },
}
