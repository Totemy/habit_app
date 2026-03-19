import type { Habit, HabitItem } from '../types/Habit'

export const createHabit = (
  title: string,
  count: number,
  color: string,
): Habit => ({
  id: crypto.randomUUID(),
  title,
  color,
  items: createHabitItems(count),
})

export const createHabitItems = (count: number): HabitItem[] => {
  return Array.from({ length: count }, () => ({
    isChecked: false,
  }))
}
