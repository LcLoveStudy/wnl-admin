import type { DirectiveObject } from '.'

export const clickoutside: DirectiveObject<() => void> = {
  name: 'clickoutside',
  method: {
    mounted(el: HTMLUnknownElement, value) {
      window.addEventListener('click', (e) => eventHander(value.value, el, e))
    },
    unmounted(el: HTMLUnknownElement, value) {
      window.removeEventListener('click', (e) => eventHander(value.value, el, e))
    },
  },
}

const eventHander = (callback: () => void, el: HTMLUnknownElement, e: Event) => {
  if (!el.contains(e.target as HTMLElement)) {
    callback()
  }
}
