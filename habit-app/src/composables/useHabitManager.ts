import { computed, ref, watch } from 'vue'
import type { Habit, HabitShape } from '../types/Habit'
import { createHabit, createHabitItems } from '../utils/habitHelper'

const STORAGE_KEY = 'habits'

export function useHabitManager() {
  const showCreate = ref(false)

  const activeHabitId = ref<string | null>(null)
  const editingHabitId = ref<string | null>(null)
  const resizingHabitId = ref<string | null>(null)

  //  helpers
  const loadHabits = (): Habit[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      const parsed = data ? JSON.parse(data) : []

      return parsed.map((habit: Habit) => ({
        ...habit,
        description: habit.description ?? '',
      }))
    } catch {
      return []
    }
  }

  const saveHabits = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits.value))
  }

  const habits = ref<Habit[]>(loadHabits())

  const findHabit = (id: string) => habits.value.find((h) => h.id === id)

  const setActiveToFirstHabit = () => {
    activeHabitId.value = habits.value[0]?.id ?? null
  }

  const updateItemsCount = (habit: Habit, newCount: number) => {
    const current = habit.items.length

    if (newCount > current) {
      habit.items.push(...createHabitItems(newCount - current))
    } else if (newCount < current) {
      habit.items.splice(newCount)
    }
  }

  const duplicate = (id: string) => {
    const habit = findHabit(id)

    if (!habit) return

    const newHabit: Habit = {
      ...habit,
      id: crypto.randomUUID(),
      title: `${habit.title} (copy)`,
      description: habit.description,
      items: habit.items.map((item) => ({ ...item })),
    }
    habits.value.push(newHabit)
  }

  // auto-save
  watch(habits, () => saveHabits(), { deep: true })

  //  actions
  const add = (
    title: string,
    count: number,
    color: string,
    shape: HabitShape,
    description?: string,
  ) => {
    const habit = createHabit(title, count, color, shape, description ?? '')
    habits.value.push(habit)
    activeHabitId.value = habit.id
  }

  const remove = (id: string) => {
    habits.value = habits.value.filter((h) => h.id !== id)

    if (activeHabitId.value === id) {
      setActiveToFirstHabit()
    }
  }

  const edit = (
    id: string,
    title: string,
    newCount: number,
    color: string,
    shape: HabitShape,
    description: string,
  ) => {
    const habit = findHabit(id)
    if (!habit) return

    habit.title = title
    habit.color = color
    habit.shape = shape
    habit.description = description

    updateItemsCount(habit, newCount)
  }

  const rename = (id: string, title: string) => {
    const habit = findHabit(id)
    if (!habit) return

    habit.title = title
    editingHabitId.value = null
  }

  const resize = (id: string, count: number) => {
    const habit = findHabit(id)
    if (!habit) return

    updateItemsCount(habit, count)
    resizingHabitId.value = null
  }

  //  state setters
  const setActive = (id: string) => {
    activeHabitId.value = id
  }

  const markAsEditing = (id: string) => {
    editingHabitId.value = id
  }

  const markAsResizing = (id: string) => {
    resizingHabitId.value = id
  }

  const openCreate = () => (showCreate.value = true)
  const closeCreate = () => (showCreate.value = false)

  //  computed
  const active = computed(() => findHabit(activeHabitId.value ?? '') ?? null)

  return {
    // state
    habits,
    active,
    activeHabitId,
    editingHabitId,
    resizingHabitId,
    showCreate,

    // actions
    add,
    remove,
    edit,
    rename,
    resize,
    duplicate,

    // UI state
    setActive,
    markAsEditing,
    markAsResizing,
    openCreate,
    closeCreate,
  }
}
