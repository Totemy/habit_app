import { onMounted, onUnmounted, ref } from 'vue'
import type { ContextMenuItem } from '../types/ContextMenu'

export const useContextMenu = () => {
  const state = ref({
    visible: false,
    x: 0,
    y: 0,
    items: [] as ContextMenuItem[],
  })

  const open = (e: MouseEvent, items: ContextMenuItem[]) => {
    e.preventDefault()
    const x = Math.min(e.clientX, window.innerWidth - 160)
    const y = Math.min(e.clientY, window.innerHeight - 200)
    state.value = {
      visible: true,
      x,
      y,
      items,
    }
  }
  const close = () => {
    state.value.visible = false
  }

  const handleClickOutside = () => close()

  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close()
  }

  onMounted(() => {
    window.addEventListener('click', handleClickOutside)
    window.addEventListener('keydown', handleEsc)
  })

  onUnmounted(() => {
    window.removeEventListener('click', handleClickOutside)
    window.removeEventListener('keydown', handleEsc)
  })

  return {
    state,
    open,
    close,
  }
}
