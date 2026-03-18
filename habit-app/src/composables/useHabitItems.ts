import { computed } from 'vue'
import type { HabitItem } from '../types/Habit'
import { createHabitItems } from '../utils/createHabitItems'

export function useHabitItems(getItems: () => HabitItem[]) {
  const items = computed(() => getItems())

  const checkedCount = computed(
    () => items.value.filter((i) => i.isChecked).length,
  )

  const progressCount = computed(
    () => `${checkedCount.value}/${items.value.length}`,
  )

  const progressPercent = computed(() =>
    items.value.length ? (checkedCount.value / items.value.length) * 100 : 0,
  )

  const isCompleted = computed(() => checkedCount.value === items.value.length)

  const reset = () => {
    items.value.forEach((i) => (i.isChecked = false))
  }

  const handleClick = (index: number) => {
    const item = items.value[index]
    item.isChecked = !item.isChecked
  }

  const done = () => {
    const index = items.value.findIndex((i) => !i.isChecked)

    if (index !== -1) {
      items.value[index].isChecked = true
    }
  }

  const undo = () => {
    const index = [...items.value].reverse().findIndex((i) => i.isChecked)

    if (index !== -1) {
      items.value[items.value.length - 1 - index].isChecked = false
    }
  }

  const resize = (newCount: number) => {
    const current = items.value.length

    if (newCount > current) {
      items.value.push(...createHabitItems(newCount - current))
    }

    if (newCount < current) {
      items.value.splice(newCount)
    }
  }

  return {
    progressCount,
    progressPercent,
    isCompleted,

    handleClick,
    reset,
    done,
    undo,
    resize,
  }
}
