import { computed } from 'vue'
import type { HabitItem } from '../types/Habit'

export function useHabitItems(habitItems: HabitItem[]) {
  const checkedCount = computed(
    () => habitItems.filter((i) => i.isChecked).length,
  )

  const progressCount = computed(
    () => `${checkedCount.value}/${habitItems.length}`,
  )

  const progressPercent = computed(() =>
    habitItems.length ? (checkedCount.value / habitItems.length) * 100 : 0,
  )

  const isCompleted = computed(() => checkedCount.value === habitItems.length)

  const reset = () => {
    habitItems.forEach((i) => (i.isChecked = false))
  }

  const handleClick = (index: number) => {
    if (habitItems[index])
      habitItems[index].isChecked = !habitItems[index].isChecked
  }

  const done = () => {
    const item = habitItems.find((i) => !i.isChecked)
    if (item) item.isChecked = true
  }

  const undo = () => {
    const item = [...habitItems].reverse().find((i) => i.isChecked)
    if (item) item.isChecked = false
  }

  return {
    progressCount,
    progressPercent,
    isCompleted,

    handleClick,
    reset,
    done,
    undo,
  }
}
