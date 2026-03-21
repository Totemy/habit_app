import type { Habit, HabitItem, HabitShape } from '../types/Habit'

export const createHabit = (
  title: string,
  count: number,
  color: string,
  shape: HabitShape = 'circle',
  description: string,
): Habit => ({
  id: crypto.randomUUID(),
  title,
  color,
  shape,
  items: createHabitItems(count),
  description,
})

export const createHabitItems = (count: number): HabitItem[] => {
  return Array.from({ length: count }, () => ({
    isChecked: false,
  }))
}
