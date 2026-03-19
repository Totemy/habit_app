import { computed, ref } from 'vue'
import type { Habit } from '../types/Habit'
import { createHabit } from '../utils/createHabit'
import { createHabitItems } from '../utils/createHabitItems'

export function useHabitManager() {
  const showCreate = ref(false)
  const habits = ref<Habit[]>([])
  const activeHabitId = ref<string | null>(null)
  const editingHabitId = ref<string | null>(null)
  const resizeHabitId = ref<string | null>(null)

  const markAsResizing = (id: string) => {
    resizeHabitId.value = id
  }

  const add = (title: string, count: number, color: string) => {
    const habit = createHabit(title, count, color)

    habits.value.push(habit)

    if (!activeHabitId.value) {
      activeHabitId.value = habit.id
    }
  }
  const resize = (id: string, newCount: number) => {
    const habit = habits.value.find((h) => h.id === id)

    if (!habit) return

    const current = habit.items.length

    if (newCount > current) {
      habit.items.push(...createHabitItems(newCount - current))
    }

    if (newCount < current) {
      habit.items.splice(newCount)
    }

    resizeHabitId.value = null
  }
  const remove = (id: string) => {
    habits.value = habits.value.filter((h) => h.id !== id)

    if (activeHabitId.value === id) {
      activeHabitId.value = habits.value[0]?.id ?? null
    }
  }
  const rename = (id: string, title: string) => {
    const habit = habits.value.find((item) => item.id === id)

    if (!habit) return

    habit.title = title
    editingHabitId.value = null
  }
  const markAsEditing = (id: string) => {
    editingHabitId.value = id
  }
  const setActive = (id: string) => {
    activeHabitId.value = id
  }
  const active = computed(
    () => habits.value.find((h) => h.id === activeHabitId.value) || null,
  )

  const openCreate = () => {
    showCreate.value = true
  }

  const closeCreate = () => {
    showCreate.value = false
  }

  return {
    habits,
    active,
    setActive,
    add,
    remove,
    rename,
    resize,
    showCreate,
    openCreate,
    closeCreate,
    editingHabitId,
    markAsEditing,
    activeHabitId,
    resizeHabitId,
    markAsResizing,
  }
}
