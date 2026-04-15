import { ref } from 'vue'
import type { ComputedRef, Ref } from 'vue'

type Identifiable = {
  id: string
}

type ReorderHandler = (draggedId: string, targetId: string) => void

const ITEM_SELECTOR = '[data-habit-item="true"]'

export const useSidebarDragAndDrop = <Item extends Identifiable>(
  items: ComputedRef<Item[]>,
  reorder: ReorderHandler,
) => {
  const listRef: Ref<HTMLElement | null> = ref(null)
  const draggedItemId = ref<string | null>(null)
  const dropTargetIndex = ref<number | null>(null)

  const resetDragState = () => {
    dropTargetIndex.value = null
    draggedItemId.value = null
  }

  const getDropIndexFromPoint = (clientY: number) => {
    const listElement = listRef.value
    if (!listElement) return null

    const itemElements = Array.from(
      listElement.querySelectorAll<HTMLElement>(ITEM_SELECTOR),
    )

    if (!itemElements.length) return 0

    for (const [index, element] of itemElements.entries()) {
      const rect = element.getBoundingClientRect()
      const midpoint = rect.top + rect.height / 2

      if (clientY < midpoint) {
        return index
      }
    }

    return itemElements.length
  }

  const updateDropTarget = (clientY: number) => {
    if (!draggedItemId.value) return

    dropTargetIndex.value = getDropIndexFromPoint(clientY)
  }

  const commitDrop = () => {
    const draggedId = draggedItemId.value
    const targetIndex = dropTargetIndex.value

    if (!draggedId || targetIndex === null) {
      resetDragState()
      return
    }

    const currentIndex = items.value.findIndex((item) => item.id === draggedId)

    if (currentIndex === -1) {
      resetDragState()
      return
    }

    const insertionIndex =
      currentIndex < targetIndex ? targetIndex - 1 : targetIndex

    const normalizedIndex = Math.max(
      0,
      Math.min(insertionIndex, items.value.length - 1),
    )

    const targetItem = items.value[normalizedIndex]

    if (targetItem && targetItem.id !== draggedId) {
      reorder(draggedId, targetItem.id)
    } else if (targetIndex === items.value.length) {
      const lastItem = items.value[items.value.length - 1]

      if (lastItem && lastItem.id !== draggedId) {
        reorder(draggedId, lastItem.id)
      }
    }

    resetDragState()
  }

  const handleDragStart = (event: DragEvent, itemId: string) => {
    draggedItemId.value = itemId

    if (!event.dataTransfer) return

    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', itemId)
  }

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
    updateDropTarget(event.clientY)
  }

  const handleDrop = (event: DragEvent) => {
    event.preventDefault()
    updateDropTarget(event.clientY)
    commitDrop()
  }

  const handleDragEnd = () => {
    resetDragState()
  }

  const handleTouchStart = (itemId: string) => {
    draggedItemId.value = itemId
  }

  const handleTouchMove = (event: TouchEvent) => {
    const touch = event.touches[0]
    if (!touch) return

    updateDropTarget(touch.clientY)
  }

  const handleTouchEnd = () => {
    commitDrop()
  }

  return {
    listRef,
    dropTargetIndex,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  }
}
