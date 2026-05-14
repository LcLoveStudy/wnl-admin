import type { DirectiveObject } from '.'

type ClickoutsideElement = HTMLElement & {
  __clickoutside__?: EventListener
  __clickoutside_callback__?: () => void
}

export const clickoutside: DirectiveObject<() => void> = {
  name: 'clickoutside',

  method: {
    mounted(el: ClickoutsideElement, binding) {
      el.__clickoutside_callback__ = binding.value

      el.__clickoutside__ = (e: Event) => {
        if (!el.contains(e.target as Node)) {
          el.__clickoutside_callback__?.()
        }
      }

      window.addEventListener('mousedown', el.__clickoutside__)
    },

    updated(el: ClickoutsideElement, binding) {
      el.__clickoutside_callback__ = binding.value
    },

    unmounted(el: ClickoutsideElement) {
      if (!el.__clickoutside__) return

      window.removeEventListener('mousedown', el.__clickoutside__)
    },
  },
}
